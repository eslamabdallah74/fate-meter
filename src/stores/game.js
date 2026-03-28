import { defineStore } from 'pinia'
import {
  getFutureState,
  getActivityConfig,
  detectPattern,
  checkDailyReset,
  getInsight,
  getLastNegativeCategory,
  getRecoveryMissions
} from '../utils/gameLogic'
import { useI18n } from '../composables/useI18n'

const STORAGE_KEY = 'fatemeter_game'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to load state:', e)
  }
  return null
}

function getDefaultState() {
  return {
    regret: 0,
    streak: 0,
    state: 'stable',
    decisions: [],
    lastCheckIn: null,
    lastDecision: null,
    dailyMissionsCompleted: 0
  }
}

export const useGameStore = defineStore('game', {
  state: () => {
    const saved = loadState()
    return saved || getDefaultState()
  },

  getters: {
    futureState: (state) => getFutureState(state.regret),
    insight: (state) => {
      const { lang } = useI18n()
      lang.value // track dependency
      return getInsight(state.regret, state.decisions, state.streak)
    },
    pattern: (state) => {
      const { lang } = useI18n()
      lang.value
      return detectPattern(state.decisions)
    },
    dailyReset: (state) => {
      const { lang } = useI18n()
      lang.value
      return checkDailyReset(state)
    },
    todayDecisions: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.decisions.filter(d => {
        const dDate = new Date(d.time).toISOString().split('T')[0]
        return dDate === today
      })
    },
    todayNegatives: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.decisions.filter(d => {
        const dDate = new Date(d.time).toISOString().split('T')[0]
        if (dDate !== today) return false
        const config = getActivityConfig(d.type)
        return config.regretChange > 0
      }).length
    },
    lastNegativeCategory: (state) => getLastNegativeCategory(state.decisions),
    recoveryMissions: (state) => {
      const catId = getLastNegativeCategory(state.decisions)
      return getRecoveryMissions(catId)
    }
  },

  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.$state))
    },

    applyDailyReset() {
      const today = new Date().toISOString().split('T')[0]
      if (this.lastCheckIn !== today) {
        this.lastCheckIn = today
        this.dailyMissionsCompleted = 0
        this.persist()
      }
    },

    makeDecision(activityId) {
      const config = getActivityConfig(activityId)
      const prevRegret = this.regret
      const isPositive = config.regretChange < 0

      this.regret += config.regretChange
      this.regret = Math.max(0, Math.min(100, this.regret))

      this.state = getFutureState(this.regret)

      const decision = {
        type: activityId,
        time: Date.now(),
        regretBefore: prevRegret,
        regretAfter: this.regret,
        regretChange: config.regretChange
      }

      this.decisions.push(decision)
      this.lastDecision = decision
      this.lastCheckIn = new Date().toISOString().split('T')[0]

      // streak logic
      if (isPositive) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yStr = yesterday.toISOString().split('T')[0]
        const hadYesterday = this.decisions.some(d => {
          const dDate = new Date(d.time).toISOString().split('T')[0]
          if (dDate !== yStr) return false
          const cfg = getActivityConfig(d.type)
          return cfg.regretChange < 0
        })
        if (hadYesterday || this.streak === 0) {
          this.streak++
        }
      } else if (this.todayNegatives >= 3) {
        this.streak = 0
      }

      this.persist()
      return decision
    },

    completeRecoveryMission() {
      this.regret = Math.max(0, this.regret - 5)
      this.state = getFutureState(this.regret)
      this.dailyMissionsCompleted++
      this.persist()
    },

    resetGame() {
      Object.assign(this.$state, getDefaultState())
      this.persist()
    }
  }
})
