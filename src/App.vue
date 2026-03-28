<template>
  <div id="app-shell">
    <nav class="nav-bar">
      <div class="nav-left">
        <router-link to="/" class="nav-brand">
          <span class="brand-icon">🔮</span>
          <span class="brand-text">FateMeter</span>
        </router-link>
        <div class="nav-status" :class="`status-${store.futureState}`">
          <span class="status-dot"></span>
          <span class="status-text">{{ stateLabel }}</span>
        </div>
      </div>
      <div class="nav-right">
        <div class="nav-links">
          <router-link to="/" class="nav-link">
            <span class="link-icon">📊</span>
            <span>{{ t('navDashboard') }}</span>
          </router-link>
          <router-link to="/history" class="nav-link">
            <span class="link-icon">📜</span>
            <span>{{ t('navTimeline') }}</span>
          </router-link>
        </div>
        <button class="lang-toggle" @click="toggleLang" :title="lang === 'en' ? 'العربية' : 'English'">
          <span class="lang-icon">🌐</span>
          <span class="lang-label">{{ lang === 'en' ? 'عربي' : 'EN' }}</span>
        </button>
      </div>
    </nav>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <span class="footer-brand">🔮 FateMeter</span>
        <span class="footer-divider">·</span>
        <span class="footer-credit">
          {{ t('footerMadeBy') }} <strong>Eslam Abdallah</strong>  {{ t('footerWith') }} ❤️
        </span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from './stores/game'
import { useI18n } from './composables/useI18n'
import { getStateLabel } from './utils/gameLogic'
import { onMounted } from 'vue'

const store = useGameStore()
const { lang, t, toggleLang } = useI18n()

const stateLabel = computed(() => getStateLabel(store.futureState))

onMounted(() => {
  store.applyDailyReset()
})
</script>

<style scoped>
/* Navbar */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: rgba(18, 18, 26, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-primary);
}

.brand-icon {
  font-size: 1.4rem;
  animation: float 3s ease-in-out infinite;
}

.brand-text {
  font-size: 1.15rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--neon-purple), var(--neon-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.nav-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid transparent;
  transition: all 0.5s ease;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.status-stable {
  background: rgba(0, 255, 136, 0.1);
  color: var(--neon-green);
  border-color: rgba(0, 255, 136, 0.2);
}
.status-stable .status-dot { background: var(--neon-green); }

.status-warning {
  background: rgba(255, 170, 0, 0.1);
  color: var(--neon-yellow);
  border-color: rgba(255, 170, 0, 0.2);
}
.status-warning .status-dot { background: var(--neon-yellow); }

.status-danger {
  background: rgba(255, 51, 102, 0.1);
  color: var(--neon-red);
  border-color: rgba(255, 51, 102, 0.2);
  animation: pulse-glow 1.5s ease-in-out infinite;
}
.status-danger .status-dot { background: var(--neon-red); }

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: all var(--transition);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.nav-link.router-link-active {
  background: rgba(0, 170, 255, 0.1);
  color: var(--neon-blue);
}

.link-icon {
  font-size: 0.9rem;
}

.lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: rgba(170, 68, 255, 0.08);
  color: var(--neon-purple);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition);
}

.lang-toggle:hover {
  background: rgba(170, 68, 255, 0.15);
  border-color: var(--neon-purple);
  box-shadow: var(--glow-purple);
}

.lang-icon { font-size: 0.9rem; }

/* Footer */
.app-footer {
  border-top: 1px solid var(--border-color);
  padding: 20px 24px;
  margin-top: auto;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.footer-brand {
  font-weight: 700;
  color: var(--text-secondary);
}

.footer-divider {
  opacity: 0.3;
}

.footer-credit {
  display: flex;
  align-items: center;
  gap: 4px;
}

.footer-credit strong {
  color: var(--neon-purple);
  font-weight: 600;
}

.footer-love {
  color: var(--neon-red);
  animation: pulse-glow 1.5s ease-in-out infinite;
}
</style>
