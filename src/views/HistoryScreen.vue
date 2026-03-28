<template>
  <div class="history-screen">
    <div class="history-header">
      <h1 class="history-title">📜 Timeline</h1>
      <p class="history-subtitle">Every decision. Every consequence.</p>
    </div>

    <div v-if="sortedDecisions.length === 0" class="empty-state">
      <span class="empty-icon">🔮</span>
      <p>No decisions yet.</p>
      <p class="empty-sub">Your future is unwritten.</p>
      <router-link to="/" class="btn btn-study" style="margin-top: 16px; width: auto;">
        Make your first decision →
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
          :class="[`type-${decision.type}`, { 'danger-point': isDangerPoint(decision, i, group) }]"
        >
          <div class="timeline-dot" :style="{ background: getColor(decision.type) }"></div>
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

    <!-- Danger Zone Warning -->
    <div v-if="store.regret >= 60" class="danger-warning">
      <span>⚠️</span>
      <span>You're in the danger zone. One more wrong move and you crash.</span>
      <router-link to="/recovery" class="btn btn-recovery" style="margin-top: 12px;">
        Enter Recovery Mode →
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { getActionConfig } from '../utils/gameLogic'

const store = useGameStore()

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

function getColor(type) {
  return getActionConfig(type).color
}

function getIcon(type) {
  return getActionConfig(type).icon
}

function getLabel(type) {
  return getActionConfig(type).label
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  if (dateStr === today) return 'Today'
  if (dateStr === yesterday) return 'Yesterday'
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

function isDangerPoint(decision, index, group) {
  // Mark when 3 consecutive skips happen
  if (decision.type !== 'skip') return false
  const before = group.slice(Math.max(0, index), index + 3)
  return before.length >= 3 && before.every(d => d.type === 'skip')
}
</script>

<style scoped>
.history-screen {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 40px;
}

.history-header {
  text-align: center;
}

.history-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--neon-blue);
  margin-bottom: 8px;
}

.history-subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 16px;
}

.empty-sub {
  margin-top: 4px;
  font-size: 0.9rem;
}

/* Timeline */
.timeline-group {
  margin-bottom: 24px;
}

.timeline-date {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 12px;
  padding-left: 28px;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  padding-left: 12px;
  position: relative;
  border-left: 2px solid var(--border-color);
  margin-left: 8px;
  transition: all var(--transition);
}

.timeline-item:hover {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

.timeline-item.danger-point {
  background: rgba(255, 51, 102, 0.05);
  border-left-color: var(--neon-red);
}

.timeline-item.danger-point::after {
  content: '⚠️ This is where things went wrong';
  position: absolute;
  bottom: -8px;
  left: 40px;
  font-size: 0.7rem;
  color: var(--neon-red);
  font-style: italic;
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 4px;
  box-shadow: 0 0 8px currentColor;
}

.timeline-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timeline-action {
  display: flex;
  align-items: center;
  gap: 8px;
}

.timeline-icon {
  font-size: 1.2rem;
}

.timeline-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.timeline-time {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.timeline-regret {
  font-size: 0.85rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.timeline-regret.up {
  color: var(--neon-red);
}

.timeline-regret.down {
  color: var(--neon-green);
}

/* Danger Warning */
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
