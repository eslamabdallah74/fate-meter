<template>
  <div class="dashboard">
    <transition name="slide">
      <div v-if="showDailyReset" class="daily-banner" @click="dismissDailyReset">
        <span class="daily-banner-icon">☀️</span>
        <span>{{ dailyMessage }}</span>
        <span class="daily-banner-dismiss">{{ t('tapToDismiss') }}</span>
      </div>
    </transition>

    <FutureStateCard />
    <RegretMeter :value="store.regret" />

    <div class="insight-card animate-slide-up" :style="{ animationDelay: '0.2s' }">
      <span class="insight-icon">🧠</span>
      <span class="insight-text">{{ store.insight }}</span>
    </div>

    <div class="animate-slide-up" :style="{ animationDelay: '0.3s' }">
      <ActivityPicker @select="handleAction" />
    </div>

    <div class="stats-row animate-slide-up" :style="{ animationDelay: '0.4s' }">
      <div class="stat-item">
        <span class="stat-value">{{ store.streak }}</span>
        <span class="stat-label">{{ t('dayStreak') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ store.todayDecisions.length }}</span>
        <span class="stat-label">{{ t('today') }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ store.decisions.length }}</span>
        <span class="stat-label">{{ t('total') }}</span>
      </div>
    </div>

    <router-link
      v-if="store.regret > 40"
      to="/recovery"
      class="recovery-link animate-slide-up"
      :style="{ animationDelay: '0.5s' }"
    >
      <span>⚡</span> {{ t('recoveryPrompt') }}
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/game'
import { useI18n } from '../composables/useI18n'
import FutureStateCard from '../components/FutureStateCard.vue'
import RegretMeter from '../components/RegretMeter.vue'
import ActivityPicker from '../components/ActivityPicker.vue'

const store = useGameStore()
const router = useRouter()
const { t } = useI18n()

const showDailyReset = ref(false)
const dailyMessage = ref('')

onMounted(() => {
  const reset = store.dailyReset
  if (reset.shouldReset) {
    showDailyReset.value = true
    dailyMessage.value = reset.message
  }
})

function dismissDailyReset() {
  showDailyReset.value = false
  store.applyDailyReset()
}

function handleAction(activityId) {
  store.makeDecision(activityId)
  router.push({ name: 'Decision', query: { action: activityId } })
}
</script>

<style scoped>
.dashboard { display: flex; flex-direction: column; gap: 20px; padding-bottom: 40px; }

.daily-banner {
  background: linear-gradient(135deg, rgba(170, 68, 255, 0.15), rgba(0, 170, 255, 0.15));
  border: 1px solid var(--neon-purple);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: var(--glow-purple);
}
.daily-banner:hover { background: linear-gradient(135deg, rgba(170, 68, 255, 0.25), rgba(0, 170, 255, 0.25)); }
.daily-banner-icon { font-size: 1.5rem; animation: float 3s ease-in-out infinite; }
.daily-banner-dismiss { margin-inline-start: auto; font-size: 0.75rem; color: var(--text-muted); }

.insight-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.insight-icon { font-size: 1.5rem; }
.insight-text { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.4; }

.stats-row { display: flex; gap: 12px; }
.stat-item { flex: 1; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 16px; text-align: center; }
.stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: var(--neon-blue); }
.stat-label { display: block; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

.recovery-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 51, 102, 0.1), rgba(255, 51, 102, 0.05));
  border: 1px solid rgba(255, 51, 102, 0.3);
  border-radius: var(--radius);
  color: var(--neon-red);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all var(--transition);
  animation: pulse-glow 2s ease-in-out infinite;
}
.recovery-link:hover { background: linear-gradient(135deg, rgba(255, 51, 102, 0.2), rgba(255, 51, 102, 0.1)); box-shadow: var(--glow-red); }

.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
