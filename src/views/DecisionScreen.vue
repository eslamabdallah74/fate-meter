<template>
  <div class="decision-screen">
    <transition name="fade" mode="out-in">
      <div v-if="actionConfig" :key="actionType" class="decision-content">
        <div class="decision-icon" :class="{ 'negative': isNegative }">
          {{ actionConfig.icon }}
        </div>

        <h1 class="decision-message" :style="{ color: isNegative ? '#ff3366' : '#00ff88' }">
          {{ t(actionConfig.messageKey) }}
        </h1>

        <div class="regret-change" :class="{ 'positive': !isNegative, 'negative': isNegative }">
          <span class="change-arrow">{{ isNegative ? '↑' : '↓' }}</span>
          <span class="change-value">{{ Math.abs(actionConfig.regretChange) }} {{ t('regret') }}</span>
        </div>

        <div class="state-shift">
          <span>{{ t('futureState') }}</span>
          <span class="state-badge" :class="`badge-${store.futureState}`">
            {{ stateEmoji }} {{ stateLabel }}
          </span>
        </div>

        <div class="decision-actions">
          <button
            v-if="isNegative"
            class="btn btn-recovery"
            @click="$router.push('/recovery')"
          >
            {{ t('fixItNow') }}
          </button>
          <button
            v-else
            class="btn btn-study"
            @click="$router.push('/')"
          >
            {{ t('keepGoing') }}
          </button>
          <button class="btn btn-ghost" @click="$router.push('/')">
            {{ t('backToDashboard') }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '../stores/game'
import { useI18n } from '../composables/useI18n'
import { getActivityConfig, getStateEmoji, getStateLabel } from '../utils/gameLogic'

const route = useRoute()
const store = useGameStore()
const { t } = useI18n()

const actionType = computed(() => route.query.action || 'skip-class')
const actionConfig = computed(() => getActivityConfig(actionType.value))
const isNegative = computed(() => actionConfig.value.regretChange > 0)
const stateEmoji = computed(() => getStateEmoji(store.futureState))
const stateLabel = computed(() => getStateLabel(store.futureState))
</script>

<style scoped>
.decision-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; text-align: center; }
.decision-content { display: flex; flex-direction: column; align-items: center; gap: 24px; max-width: 400px; }
.decision-icon { font-size: 4rem; animation: float 2s ease-in-out infinite; }
.decision-icon.negative { animation: shake 0.5s ease-in-out, float 2s ease-in-out infinite 0.5s; }
.decision-message { font-size: 1.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.5px; }

.regret-change { display: flex; align-items: center; gap: 8px; font-size: 1.3rem; font-weight: 700; padding: 12px 24px; border-radius: var(--radius-sm); }
.regret-change.positive { background: rgba(0, 255, 136, 0.1); color: var(--neon-green); border: 1px solid rgba(0, 255, 136, 0.3); }
.regret-change.negative { background: rgba(255, 51, 102, 0.1); color: var(--neon-red); border: 1px solid rgba(255, 51, 102, 0.3); }
.change-arrow { font-size: 1.5rem; }
.state-shift { display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.95rem; }
.state-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; }
.badge-stable { background: rgba(0, 255, 136, 0.15); color: var(--neon-green); }
.badge-warning { background: rgba(255, 170, 0, 0.15); color: var(--neon-yellow); }
.badge-danger { background: rgba(255, 51, 102, 0.15); color: var(--neon-red); }
.decision-actions { display: flex; flex-direction: column; gap: 12px; width: 100%; margin-top: 8px; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
