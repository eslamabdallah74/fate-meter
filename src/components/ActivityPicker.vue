<template>
  <div class="activity-picker">
    <h3 class="section-title">{{ t('whatAreYouDoing') }}</h3>

    <div class="categories-grid">
      <button
        v-for="cat in translatedCategories"
        :key="cat.id"
        class="category-tile"
        :class="{ active: expandedCategory === cat.id }"
        :style="expandedCategory === cat.id ? {
          borderColor: cat.color,
          boxShadow: `0 0 16px ${cat.color}30`
        } : {}"
        @click="toggleCategory(cat.id)"
      >
        <span class="tile-icon">{{ cat.icon }}</span>
        <span class="tile-name">{{ cat.name }}</span>
        <span class="tile-count">{{ cat.activities.length }}</span>
      </button>
    </div>

    <transition name="expand">
      <div v-if="expandedCategory" class="activities-panel" :style="{ borderColor: currentCategory?.color }">
        <div class="panel-header">
          <span class="panel-icon">{{ currentCategory?.icon }}</span>
          <span class="panel-title">{{ currentCategory?.name }}</span>
          <button class="panel-close" @click="expandedCategory = null">✕</button>
        </div>
        <div class="activities-grid">
          <button
            v-for="activity in currentActivities"
            :key="activity.id"
            class="activity-card"
            :class="activity.regretChange > 0 ? 'negative' : 'positive'"
            @click="$emit('select', activity.id)"
          >
            <span class="activity-icon">{{ activity.icon }}</span>
            <span class="activity-label">{{ activity.label }}</span>
            <span class="activity-impact" :class="activity.regretChange > 0 ? 'up' : 'down'">
              {{ activity.regretChange > 0 ? '+' : '' }}{{ activity.regretChange }}
            </span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { categories } from '../utils/gameLogic'
import { useI18n } from '../composables/useI18n'

defineEmits(['select'])
const { t } = useI18n()

const expandedCategory = ref(null)

const translatedCategories = computed(() =>
  categories.map(cat => ({
    ...cat,
    name: t(cat.nameKey),
    activities: cat.activities.map(act => ({
      ...act,
      label: t(act.labelKey)
    }))
  }))
)

const currentCategory = computed(() => {
  if (!expandedCategory.value) return null
  return translatedCategories.value.find(c => c.id === expandedCategory.value)
})

const currentActivities = computed(() => {
  return currentCategory.value ? currentCategory.value.activities : []
})

function toggleCategory(id) {
  expandedCategory.value = expandedCategory.value === id ? null : id
}
</script>

<style scoped>
.activity-picker {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
}

.categories-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.category-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  position: relative;
}

.category-tile:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

.category-tile.active {
  color: var(--text-primary);
  background: var(--bg-card-hover);
}

.tile-icon { font-size: 1.4rem; }
.tile-name { font-size: 0.75rem; text-align: center; line-height: 1.2; }
.tile-count {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 0.6rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-secondary);
  padding: 1px 6px;
  border-radius: 8px;
}

[dir="rtl"] .tile-count {
  right: auto;
  left: 8px;
}

.activities-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 16px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.panel-icon { font-size: 1.2rem; }
.panel-title { font-size: 0.95rem; font-weight: 600; color: var(--text-primary); flex: 1; }
.panel-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all var(--transition);
}
.panel-close:hover { color: var(--text-primary); background: var(--bg-secondary); }

.activities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.activity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 6px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  cursor: pointer;
  transition: all var(--transition);
  text-align: center;
}

.activity-card:hover { transform: translateY(-2px); }
.activity-card.positive:hover { border-color: var(--neon-green); box-shadow: 0 0 12px rgba(0, 255, 136, 0.15); }
.activity-card.negative:hover { border-color: var(--neon-red); box-shadow: 0 0 12px rgba(255, 51, 102, 0.15); }
.activity-card:active { transform: scale(0.96); }
.activity-icon { font-size: 1.4rem; }
.activity-label { font-size: 0.75rem; font-weight: 500; color: var(--text-primary); line-height: 1.2; }
.activity-impact { font-size: 0.65rem; font-weight: 700; font-variant-numeric: tabular-nums; padding: 2px 8px; border-radius: 10px; }
.activity-impact.up { background: rgba(255, 51, 102, 0.15); color: var(--neon-red); }
.activity-impact.down { background: rgba(0, 255, 136, 0.15); color: var(--neon-green); }

.expand-enter-active { transition: all 0.3s ease; overflow: hidden; }
.expand-leave-active { transition: all 0.2s ease; overflow: hidden; }
.expand-enter-from { opacity: 0; max-height: 0; transform: translateY(-8px); }
.expand-enter-to { opacity: 1; max-height: 800px; transform: translateY(0); }
.expand-leave-from { opacity: 1; max-height: 800px; }
.expand-leave-to { opacity: 0; max-height: 0; }
</style>
