<template>
  <div class="dashboard">
    <!-- Daily Reset Banner -->
    <transition name="slide">
      <div v-if="showDailyReset" class="daily-banner" @click="dismissDailyReset">
        <span class="daily-banner-icon">☀️</span>
        <span>{{ dailyMessage }}</span>
        <span class="daily-banner-dismiss">tap to dismiss</span>
      </div>
    </transition>

    <!-- Future State Card -->
    <FutureStateCard />

    <!-- Regret Meter -->
    <RegretMeter :value="store.regret" />

    <!-- Insight -->
    <div class="insight-card animate-slide-up" :style="{ animationDelay: '0.2s' }">
      <span class="insight-icon">🧠</span>
      <span class="insight-text">{{ store.insight }}</span>
    </div>

    <!-- Quick Actions -->
    <div class="actions-section animate-slide-up" :style="{ animationDelay: '0.3s' }">
      <h3 class="section-title">What are you doing?</h3>
      <div class="actions-grid">
        <button class="btn btn-study" @click="handleAction('study')">
          <span>📚</span>
          <span>Study Now<br><small>→ Stabilize</small></span>
        </button>
        <button class="btn btn-skip" @click="handleAction('skip')">
          <span>⏭️</span>
          <span>Skip<br><small>→ Risk It</small></span>
        </button>
        <button class="btn btn-focus" @click="handleAction('focus')">
          <span>🎯</span>
          <span>Focus 10 min<br><small>→ Recover</small></span>
        </button>
        <button class="btn btn-distracted" @click="handleAction('distracted')">
          <span>📱</span>
          <span>Distracted<br><small>→ Lost Time</small></span>
        </button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-row animate-slide-up" :style="{ animationDelay: '0.4s' }">
      <div class="stat-item">
        <span class="stat-value">{{ store.streak }}</span>
        <span class="stat-label">Day Streak</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ store.todayDecisions.length }}</span>
        <span class="stat-label">Today</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ store.decisions.length }}</span>
        <span class="stat-label">Total</span>
      </div>
    </div>

    <!-- Recovery Link -->
    <router-link
      v-if="store.regret > 40"
      to="/recovery"
      class="recovery-link animate-slide-up"
      :style="{ animationDelay: '0.5s' }"
    >
      <span>⚡</span> Fix this now or it gets worse →
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/game'
import FutureStateCard from '../components/FutureStateCard.vue'
import RegretMeter from '../components/RegretMeter.vue'

const store = useGameStore()
const router = useRouter()

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

function handleAction(type) {
  store.makeDecision(type)
  router.push({ name: 'Decision', query: { action: type } })
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
}

/* Daily Reset Banner */
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

.daily-banner:hover {
  background: linear-gradient(135deg, rgba(170, 68, 255, 0.25), rgba(0, 170, 255, 0.25));
}

.daily-banner-icon {
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.daily-banner-dismiss {
  margin-left: auto;
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Insight */
.insight-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.insight-icon {
  font-size: 1.5rem;
}

.insight-text {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.4;
}

/* Actions */
.section-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.actions-grid .btn {
  flex-direction: column;
  padding: 20px 16px;
  font-size: 1rem;
  line-height: 1.3;
}

.actions-grid .btn span:first-child {
  font-size: 1.5rem;
}

.actions-grid .btn small {
  font-size: 0.75rem;
  opacity: 0.8;
  font-weight: 400;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 12px;
}

.stat-item {
  flex: 1;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 16px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--neon-blue);
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Recovery Link */
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

.recovery-link:hover {
  background: linear-gradient(135deg, rgba(255, 51, 102, 0.2), rgba(255, 51, 102, 0.1));
  box-shadow: var(--glow-red);
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
