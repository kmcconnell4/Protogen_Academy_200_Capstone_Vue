<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { MIN_MONTH, MAX_MONTH, selectedStart, selectedEnd } from '../composables/useMetrics'

const toggleTheme = inject<() => void>('toggleTheme')
const isDark = inject<() => boolean>('isDark')

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
})

// All available month options derived from the data bounds
function monthsBetween(start: string, end: string): string[] {
  const result: string[] = []
  const [sy, sm] = start.split('-').map(Number)
  const [ey, em] = end.split('-').map(Number)
  let y = sy, m = sm
  while (y < ey || (y === ey && m <= em)) {
    result.push(`${y}-${String(m).padStart(2, '0')}`)
    m++
    if (m > 12) { m = 1; y++ }
  }
  return result
}

const allMonths = monthsBetween(MIN_MONTH, MAX_MONTH)

function monthLabel(m: string): string {
  const [year, month] = m.split('-')
  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Local picker state
const localStart = ref(selectedStart.value)
const localEnd   = ref(selectedEnd.value)

// Push changes back to shared composable state, keeping start <= end
watch(localStart, v => {
  selectedStart.value = v
  if (v > localEnd.value) localEnd.value = v
})
watch(localEnd, v => {
  selectedEnd.value = v
  if (v < localStart.value) localStart.value = v
})

const startOptions = computed(() => allMonths.filter(m => m <= localEnd.value))
const endOptions   = computed(() => allMonths.filter(m => m >= localStart.value))
</script>

<template>
  <v-app-bar
    flat
    :elevation="0"
    class="app-bar"
    role="banner"
  >
    <!-- Brand -->
    <v-app-bar-title>
      <div class="app-bar__brand">
        <svg
          class="app-bar__logo"
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
        <span class="app-bar__wordmark">FastForward</span>
      </div>
    </v-app-bar-title>

    <!-- Greeting -->
    <span class="app-bar__greeting" aria-live="polite">
      {{ greeting }}, Kirsten
    </span>

    <!-- Date range pickers -->
    <div class="app-bar__date-range" role="group" aria-label="Filter date range">
      <v-select
        v-model="localStart"
        :items="startOptions"
        :item-title="(m: string) => monthLabel(m)"
        :item-value="(m: string) => m"
        density="compact"
        variant="outlined"
        hide-details
        class="app-bar__select"
        aria-label="Start month"
      />
      <span class="app-bar__range-sep" aria-hidden="true">→</span>
      <v-select
        v-model="localEnd"
        :items="endOptions"
        :item-title="(m: string) => monthLabel(m)"
        :item-value="(m: string) => m"
        density="compact"
        variant="outlined"
        hide-details
        class="app-bar__select"
        aria-label="End month"
      />
    </div>

    <!-- Theme toggle -->
    <v-btn
      :icon="isDark && isDark() ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      :aria-label="isDark && isDark() ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-pressed="isDark ? isDark() : true"
      variant="outlined"
      size="small"
      class="app-bar__theme-btn"
      @click="toggleTheme && toggleTheme()"
    />
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  background: var(--surface) !important;
  border-bottom: 1px solid var(--border) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.app-bar__brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.app-bar__logo {
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
}

.app-bar__wordmark {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.app-bar__greeting {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary);
  white-space: nowrap;
  pointer-events: none;
}

.app-bar__date-range {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
}

.app-bar__select {
  width: 140px;
}

.app-bar__range-sep {
  color: var(--text-muted);
  font-size: 1rem;
}

.app-bar__theme-btn {
  margin-right: 1rem;
  border-color: var(--border) !important;
  color: var(--text-primary) !important;
}

@media (max-width: 768px) {
  .app-bar__greeting { display: none; }
  .app-bar__select   { width: 110px; }
}
</style>

