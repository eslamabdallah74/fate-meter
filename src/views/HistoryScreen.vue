<template>
  <div class="history-screen">
    <div class="history-header">
      <h1 class="history-title">{{ t('timelineTitle') }}</h1>
      <p class="history-subtitle">{{ t('timelineSubtitle') }}</p>
    </div>

    <div v-if="sortedDecisions.length === 0" class="empty-state">
      <span class="empty-icon">🔮</span>
      <p>{{ t('noDecisions') }}</p>
      <p class="empty-sub">{{ t('futureUnwritten') }}</p>
      <router-link to="/" class="btn btn-study" style="margin-top: 16px; width: auto;">
        {{ t('makeFirstDecision') }}
      </router-link>
    </div>

    <div v-else class="timeline">
      <div
        v-for="(group, date) in groupedDecisions"
        :key="date"
        class="timeline-group"
      >
        <div class="timeline-date">{{ formatDate(date) }}</div>
        <div
          v-for="(decision, i) in group"
          :key="i"
          class="timeline-item"
          :class="{ 'danger-point': isDangerPoint(decision, i, group) }"
        >
          <div class="timeline-dot" :style="{ background: getDotColor(decision.type) }"></div>
          <div class="timeline-content">
            <div class="timeline-action">
              <span class="timeline-icon">{{ getIcon(decision.type) }}</span>
              <span class="timeline-label">{{ getLabel(decision.type) }}</span>
            </div>
            <div class="timeline-meta">
              <span class="timeline-time">{{ formatTime(decision.time) }}</span>
              <span
                class="timeline-regret"
                :class="decision.regretChange > 0 ? 'up' : 'down'"
              >
                {{ decision.regretChange > 0 ? '+' : '' }}{{ decision.regretChange }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.regret >= 60" class="danger-warning">
      <span>⚠️</span>
      <span>{{ t('dangerWarning') }}</span>
      <router-link to="/recovery" class="btn btn-recovery" style="margin-top: 12px;">
        {{ t('enterRecovery') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { useI18n } from '../composables/useI18n'
import { getActivityConfig } from '../utils/gameLogic'

const store = useGameStore()
const { t, lang } = useI18n()

const sortedDecisions = computed(() =>
  [...store.decisions].sort((a, b) => b.time - a.time)
)

const groupedDecisions = computed(() => {
  const groups = {}
  sortedDecisions.value.forEach(d => {
    const date = new Date(d.time).toISOString().split('T')[0]
    if (!groups[date]) groups[date] = []
    groups[date].push(d)
  })
  return groups
})

function getDotColor(type) {
  const config = getActivityConfig(type)
  return config.regretChange > 0 ? '#ff3366' : '#00ff88'
}

function getIcon(type) {
  return getActivityConfig(type).icon
}

function getLabel(type) {
  const config = getActivityConfig(type)
  return t(config.labelKey)
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (dateStr === today) return t('today')
  if (dateStr === yesterday) return lang.value === 'ar' ? 'أمس' : 'Yesterday'
  const locale = lang.value === 'ar' ? 'ar' : 'en-US'
  return date.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(timestamp) {
  const locale = lang.value === 'ar' ? 'ar' : 'en-US'
  return new Date(timestamp).toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function isDangerPoint(decision, index, group) {
  if (index + 2 >= group.length) return false
  const config1 = getActivityConfig(group[index].type)
  const config2 = getActivityConfig(group[index + 1]?.type || '')
  const config3 = getActivityConfig(group[index + 2]?.type || '')
  return config1.regretChange > 0 && config2.regretChange > 0 && config3.regretChange > 0
}
</script>

<style scoped>
.history-screen { display: flex; flex-direction: column; gap: 24px; padding-bottom: 40px; }
.history-header { text-align: center; }
.history-title { font-size: 1.8rem; font-weight: 700; color: var(--neon-blue); margin-bottom: 8px; }
.history-subtitle { color: var(--text-secondary); font-size: 0.95rem; }
.empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
.empty-icon { font-size: 3rem; display: block; margin-bottom: 16px; }
.empty-sub { margin-top: 4px; font-size: 0.9rem; }

.timeline-group { margin-bottom: 24px; }
.timeline-date { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); margin-bottom: 12px; padding-inline-start: 28px; }
.timeline-item { display: flex; align-items: flex-start; gap: 16px; padding: 12px 0; padding-inline-start: 12px; position: relative; border-inline-start: 2px solid var(--border-color); margin-inline-start: 8px; transition: all var(--transition); }
.timeline-item:hover { background: rgba(255, 255, 255, 0.02); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.timeline-item.danger-point { background: rgba(255, 51, 102, 0.05); border-inline-start-color: var(--neon-red); }
.timeline-item.danger-point::after { content: attr(data-danger-text); position: absolute; bottom: -8px; inset-inline-start: 40px; font-size: 0.7rem; color: var(--neon-red); font-style: italic; }
.timeline-dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; box-shadow: 0 0 8px currentColor; }
.timeline-content { flex: 1; display: flex; justify-content: space-between; align-items: center; }
.timeline-action { display: flex; align-items: center; gap: 8px; }
.timeline-icon { font-size: 1.2rem; }
.timeline-label { font-weight: 600; font-size: 0.95rem; }
.timeline-meta { display: flex; align-items: center; gap: 12px; }
.timeline-time { font-size: 0.8rem; color: var(--text-muted); }
.timeline-regret { font-size: 0.85rem; font-weight: 700; font-variant-numeric: tabular-nums; }
.timeline-regret.up { color: var(--neon-red); }
.timeline-regret.down { color: var(--neon-green); }

.danger-warning {
  background: rgba(255, 51, 102, 0.1);
  border: 1px solid rgba(255, 51, 102, 0.3);
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
  color: var(--neon-red);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  animation: pulse-glow 2s ease-in-out infinite;
}
</style>
