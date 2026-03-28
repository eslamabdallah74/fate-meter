<template>
  <div id="app-shell">
    <nav class="nav-bar">
      <router-link to="/" class="nav-brand">🔮 FateMeter</router-link>
      <div class="nav-links">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/history">Timeline</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { useGameStore } from './stores/game'
import { onMounted } from 'vue'

const store = useGameStore()

onMounted(() => {
  store.applyDailyReset()
})
</script>
