<script setup lang="ts">
defineProps<{
  label: string
  value: string
  trend: string
  trendType?: 'positive' | 'negative' | 'neutral'
  ariaLabel?: string
}>()
</script>

<template>
  <article
    class="card kpi-card"
    :aria-label="ariaLabel ?? `${label}: ${value}. Trend: ${trend}`"
  >
    <p class="kpi-card__label">{{ label }}</p>
    <p class="kpi-card__value">{{ value }}</p>
    <p
      class="kpi-card__delta"
      :class="`kpi-card__delta--${trendType ?? 'neutral'}`"
      aria-live="polite"
    >
      {{ trend }}
    </p>
  </article>
</template>
