<template>
  <div class="future-state-card" :class="[`state-${store.futureState}`]">
    <div class="state-emoji">{{ stateEmoji }}</div>
    <h2 class="state-title">{{ stateLabel }}</h2>
    <p class="state-description">{{ stateDescription }}</p>
    <div class="state-glow"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import { getStateEmoji, getStateLabel, getStateDescription } from '../utils/gameLogic'

const store = useGameStore()

const stateEmoji = computed(() => getStateEmoji(store.futureState))
const stateLabel = computed(() => getStateLabel(store.futureState))
const stateDescription = computed(() => getStateDescription(store.futureState))
</script>

<style scoped>
.future-state-card {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 32px 24px;
  text-align: center;
  overflow: hidden;
  transition: all 0.5s ease;
}

.state-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  pointer-events: none;
  transition: all 0.5s ease;
}

.state-stable {
  border-color: var(--neon-green);
  box-shadow: var(--glow-green);
}

.state-stable .state-glow {
  background: var(--neon-green);
}

.state-warning {
  border-color: var(--neon-yellow);
  box-shadow: 0 0 20px rgba(255, 170, 0, 0.3);
}

.state-warning .state-glow {
  background: var(--neon-yellow);
}

.state-danger {
  border-color: var(--neon-red);
  box-shadow: var(--glow-red);
  animation: pulse-glow 1.5s ease-in-out infinite;
}

.state-danger .state-glow {
  background: var(--neon-red);
  opacity: 0.25;
}

.state-emoji {
  font-size: 3rem;
  margin-bottom: 12px;
  animation: float 3s ease-in-out infinite;
}

.state-title {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.state-stable .state-title { color: var(--neon-green); }
.state-warning .state-title { color: var(--neon-yellow); }
.state-danger .state-title { color: var(--neon-red); }

.state-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
}
</style>
