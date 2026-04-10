<script setup lang="ts">
import { ref, provide, computed } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

const theme = ref<'dark' | 'light'>('dark')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

const isDark = computed(() => theme.value === 'dark')

provide('toggleTheme', toggleTheme)
provide('isDark', () => isDark.value)
</script>

<template>
  <div class="app-bg" aria-hidden="true"></div>
  <div :data-theme="theme" class="app-shell">
    <!-- Skip to main content (accessibility) -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--accent);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0 0 0.5rem 0.5rem;
  font-weight: 600;
  text-decoration: none;
  z-index: 999;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
</style>
