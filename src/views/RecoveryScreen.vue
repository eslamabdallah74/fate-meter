<template>
  <div class="recovery-screen">
    <div class="recovery-header">
      <h1 class="recovery-title">{{ t('recoveryTitle') }}</h1>
      <p class="recovery-subtitle">{{ categoryLabel }} — {{ t('recoverySubtitle') }}</p>
    </div>

    <div class="missions">
      <div
        v-for="(mission, i) in localMissions"
        :key="i"
        class="mission-card"
        :class="{ completed: mission.completed }"
      >
        <div class="mission-icon">{{ mission.icon }}</div>
        <div class="mission-info">
          <h3 class="mission-name">{{ t(mission.nameKey) }}</h3>
          <p class="mission-desc">{{ t(mission.descKey) }}</p>
        </div>
        <button
          v-if="!mission.completed"
          class="btn btn-recovery mission-btn"
          @click="completeMission(i)"
        >
          {{ t('complete') }}
        </button>
        <div v-else class="mission-done">{{ t('done') }}</div>
      </div>
    </div>

    <div class="recovery-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <span class="progress-text">{{ completedCount }}/{{ localMissions.length }} {{ t('missionsComplete') }}</span>
    </div>

    <div class="recovery-actions">
      <button class="btn btn-study" @click="finishRecovery">
        {{ t('backToDashboardArrow') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/game'
import { useI18n } from '../composables/useI18n'
import { getCategoryById } from '../utils/gameLogic'

const store = useGameStore()
const router = useRouter()
const { t } = useI18n()

const missionsFromStore = computed(() => store.recoveryMissions)
const categoryLabel = computed(() => {
  const catId = store.lastNegativeCategory
  const cat = getCategoryById(catId)
  return cat ? t(cat.nameKey) : ''
})

const localMissions = reactive(
  missionsFromStore.value.map(m => ({ ...m, completed: false }))
)

const completedCount = computed(() => localMissions.filter(m => m.completed).length)
const progressPercent = computed(() => (completedCount.value / localMissions.length) * 100)

function completeMission(index) {
  localMissions[index].completed = true
  store.completeRecoveryMission()
}

function finishRecovery() {
  router.push('/')
}
</script>

<style scoped>
.recovery-screen { display: flex; flex-direction: column; gap: 24px; }
.recovery-header { text-align: center; }
.recovery-title { font-size: 1.8rem; font-weight: 700; color: var(--neon-purple); margin-bottom: 8px; }
.recovery-subtitle { color: var(--text-secondary); font-size: 0.95rem; }
.missions { display: flex; flex-direction: column; gap: 12px; }
.mission-card { display: flex; align-items: center; gap: 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 20px; transition: all var(--transition); }
.mission-card:hover:not(.completed) { border-color: var(--neon-purple); box-shadow: var(--glow-purple); }
.mission-card.completed { opacity: 0.6; border-color: var(--neon-green); }
.mission-icon { font-size: 2rem; flex-shrink: 0; }
.mission-info { flex: 1; }
.mission-name { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
.mission-desc { font-size: 0.85rem; color: var(--text-muted); }
.mission-btn { flex-shrink: 0; width: auto; padding: 10px 20px; font-size: 0.85rem; }
.mission-done { flex-shrink: 0; color: var(--neon-green); font-weight: 700; font-size: 0.9rem; }
.recovery-progress { text-align: center; }
.progress-bar { height: 6px; background: var(--bg-secondary); border-radius: 3px; overflow: hidden; margin-bottom: 8px; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--neon-purple), var(--neon-blue)); border-radius: 3px; transition: width 0.5s ease; }
.progress-text { font-size: 0.8rem; color: var(--text-muted); }
.recovery-actions { margin-top: 8px; }
</style>
