<!-- RegionalPerformanceChart — Horizontal bar chart by region -->
<script setup lang="ts">
import { computed, inject } from 'vue'
import { Bar } from 'vue-chartjs'
import type { TooltipItem } from 'chart.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const isDark = inject<() => boolean>('isDark')

const textColor = computed(() => isDark && isDark() ? '#cdb9fe' : '#4c1d95')
const gridColor = computed(() => isDark && isDark() ? 'rgba(167,139,250,0.14)' : 'rgba(109,40,217,0.08)')

const regions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West Coast', 'International']
const scores  = [96.1, 91.4, 88.7, 93.2, 97.5, 85.3]

const barColors = computed(() =>
  scores.map(s => {
    if (s >= 95) return isDark && isDark() ? 'rgba(74,222,128,0.8)' : 'rgba(22,163,74,0.75)'
    if (s >= 90) return isDark && isDark() ? 'rgba(96,165,250,0.8)' : 'rgba(59,130,246,0.75)'
    return isDark && isDark() ? 'rgba(251,191,36,0.8)' : 'rgba(180,83,9,0.65)'
  })
)

const chartData = computed(() => ({
  labels: regions,
  datasets: [
    {
      label: 'On-Time Rate (%)',
      data: scores,
      backgroundColor: barColors.value,
      borderRadius: 6,
      hoverBackgroundColor: barColors.value.map(c => c.replace(/[\d.]+\)$/, '1)')),
    },
  ],
}))

const chartOptions = computed(() => ({
  indexAxis: 'y' as const,
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 850, easing: 'easeInOutQuart' as const },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: isDark && isDark() ? '#0e0c1f' : '#fff',
      titleColor: isDark && isDark() ? '#cdb9fe' : '#4c1d95',
      bodyColor: isDark && isDark() ? '#f0ebff' : '#1e1b4b',
      borderColor: isDark && isDark() ? 'rgba(167,139,250,0.35)' : 'rgba(124,58,237,0.2)',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx: TooltipItem<'bar'>) => ` ${((ctx.parsed.x as number | null) ?? 0).toFixed(1)}%`,
      },
    },
  },
  scales: {
    x: {
      min: 80,
      max: 100,
      grid: { color: gridColor.value },
      ticks: {
        color: textColor.value,
        font: { family: 'Inter', size: 12 },
        callback: (v: string | number) => `${v}%`,
      },
    },
    y: {
      grid: { color: 'transparent' },
      ticks: { color: textColor.value, font: { family: 'Inter', size: 12 } },
    },
  },
}))
</script>

<template>
  <section class="card chart-card" aria-labelledby="regional-title">
    <h2 id="regional-title" class="chart-card__title">Regional Performance</h2>
    <div
      class="chart-card__canvas-wrap"
      role="img"
      aria-label="Horizontal bar chart showing on-time delivery rate by region"
    >
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style scoped>
.chart-card__canvas-wrap {
  height: 260px;
}
</style>
