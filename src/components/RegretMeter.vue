<template>
  <div class="regret-meter animate-slide-up" :style="{ animationDelay: '0.1s' }">
    <div class="meter-header">
      <span class="meter-label">Regret Meter</span>
      <span class="meter-value" :style="{ color: barColor }">{{ displayValue }}%</span>
    </div>
    <div class="meter-track">
      <div
        class="meter-fill"
        :style="{ width: displayValue + '%', background: barGradient }"
      >
        <div class="meter-shine"></div>
      </div>
    </div>
    <div class="meter-footer">
      <span class="meter-status" :style="{ color: barColor }">{{ statusText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getRegretColor, getRegretMessage } from '../utils/gameLogic'

const props = defineProps({
  value: { type: Number, default: 0 }
})

const displayValue = ref(0)

const barColor = computed(() => getRegretColor(displayValue.value))
const statusText = computed(() => getRegretMessage(displayValue.value))

const barGradient = computed(() => {
  const v = displayValue.value
  if (v < 30) return 'linear-gradient(90deg, #00cc6a, #00ff88)'
  if (v < 60) return 'linear-gradient(90deg, #cc8800, #ffaa00)'
  return 'linear-gradient(90deg, #cc2244, #ff3366)'
})

onMounted(() => {
  animateValue(props.value)
})

watch(() => props.value, (newVal) => {
  animateValue(newVal)
})

function animateValue(target) {
  const start = displayValue.value
  const diff = target - start
  const duration = 600
  const startTime = performance.now()

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValue.value = Math.round(start + diff * eased)
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}
</script>

<style scoped>
.regret-meter {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 20px;
}

.meter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.meter-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
}

.meter-value {
  font-size: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.meter-track {
  height: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.meter-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.meter-shine {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255,255,255,0.2), transparent);
  border-radius: 6px 6px 0 0;
}

.meter-footer {
  margin-top: 8px;
  text-align: right;
}

.meter-status {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>
