<script setup lang="ts">
import { computed, inject } from 'vue'

const toggleTheme = inject<() => void>('toggleTheme')
const isDark = inject<() => boolean>('isDark')

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
})
</script>

<template>
  <header class="app-header" role="banner">
    <div class="app-header__inner">
      <!-- Brand -->
      <div class="app-header__brand" aria-label="FastForward Dashboard">
        <svg
          class="app-header__logo"
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="16" cy="16" r="16" fill="url(#logoGrad)" />
          <path d="M8 16l6-7v5h10l-6 7v-5H8z" fill="white" />
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#a78bfa" />
              <stop offset="100%" stop-color="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>
        <span class="app-header__wordmark">FastForward</span>
      </div>

      <!-- Greeting -->
      <p class="app-header__greeting" aria-live="polite">
        {{ greeting }}, Kirsten
      </p>

      <!-- Actions -->
      <div class="app-header__actions">
        <button
          class="theme-toggle"
          :aria-label="isDark && isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
          :aria-pressed="isDark ? isDark() : true"
          @click="toggleTheme && toggleTheme()"
        >
          <span aria-hidden="true" class="theme-toggle__icon">
            {{ isDark && isDark() ? '☀️' : '🌙' }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: var(--header-height);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background var(--transition), border-color var(--transition);
}

.app-header__inner {
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
}

.app-header__logo {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.app-header__wordmark {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.app-header__greeting {
  flex: 1;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.375rem 0.625rem;
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 1;
  transition: background var(--transition), transform var(--transition);
}

.theme-toggle:hover {
  background: var(--surface-hover);
  transform: scale(1.08);
}

.theme-toggle__icon {
  display: block;
}
</style>
