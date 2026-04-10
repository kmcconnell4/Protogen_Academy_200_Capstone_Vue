<script setup lang="ts">
import { computed, provide, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

// Vuetify's theme is the single source of truth for both systems
const vuetifyTheme = useTheme()

const isDark = computed(() => vuetifyTheme.global.current.value.dark)

function toggleTheme() {
  vuetifyTheme.global.name.value = isDark.value ? 'light' : 'dark'
}

// Keep our CSS custom-property system in sync with Vuetify's theme
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', vuetifyTheme.global.name.value)
})

provide('toggleTheme', toggleTheme)
provide('isDark', () => isDark.value)
</script>

<template>
  <!-- v-app is required for Vuetify's theme context, elevation, and overlay systems -->
  <v-app :theme="vuetifyTheme.global.name.value" class="app-root">
    <div class="app-bg" aria-hidden="true"></div>
    <div class="app-shell">
      <!-- Skip to main content (accessibility) -->
      <a href="#main-content" class="skip-link">Skip to main content</a>

      <AppHeader />
      <RouterView />
      <AppFooter />
    </div>
  </v-app>
</template>

<style scoped>
/* v-app sets its own background; reset it so our animated gradient shows through */
.app-root :deep(.v-application__wrap) {
  background: transparent;
  min-height: 100dvh;
}

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
