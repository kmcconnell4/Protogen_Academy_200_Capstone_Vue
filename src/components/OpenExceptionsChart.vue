<!-- OpenExceptionsChart — Line chart showing exceptions trend over 30 days -->
<script setup lang="ts">
import { computed, inject } from 'vue'
import { Line } from 'vue-chartjs'
import type { TooltipItem } from 'chart.js'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

const isDark = inject<() => boolean>('isDark')

const textColor  = computed(() => isDark && isDark() ? '#c4b5fd' : '#4c1d95')
const gridColor  = computed(() => isDark && isDark() ? 'rgba(167,139,250,0.12)' : 'rgba(109,40,217,0.08)')
const lineColor  = computed(() => isDark && isDark() ? '#f87171' : '#b91c1c')
const fillColor  = computed(() => isDark && isDark() ? 'rgba(248,113,113,0.15)' : 'rgba(185,28,28,0.08)')

// Last 30 days labels
const labels = Array.from({ length: 30 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (29 - i))
  return `${d.getMonth() + 1}/${d.getDate()}`
})

const data = [
  18, 22, 19, 25, 30, 28, 26, 24, 20, 18,
  21, 23, 27, 31, 29, 24, 22, 19, 17, 20,
  24, 26, 28, 30, 27, 22, 18, 15, 17, 14,
]

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: 'Open Exceptions',
      data,
      borderColor: lineColor.value,
      backgroundColor: fillColor.value,
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: lineColor.value,
      borderWidth: 2,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 900, easing: 'easeInOutQuart' as const },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: isDark && isDark() ? '#1e1b4b' : '#fff',
      titleColor: isDark && isDark() ? '#c4b5fd' : '#4c1d95',
      bodyColor: isDark && isDark() ? '#f5f3ff' : '#1e1b4b',
      borderColor: isDark && isDark() ? 'rgba(167,139,250,0.3)' : 'rgba(124,58,237,0.2)',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx: TooltipItem<'line'>) => ` ${ctx.parsed.y ?? 0} exceptions`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: {
        color: textColor.value,
        font: { family: 'Inter', size: 11 },
        maxTicksLimit: 10,
      },
    },
    y: {
      grid: { color: gridColor.value },
      ticks: { color: textColor.value, font: { family: 'Inter', size: 12 } },
      beginAtZero: true,
    },
  },
}))
</script>

<template>
  <section class="card chart-card" aria-labelledby="exceptions-title">
    <h2 id="exceptions-title" class="chart-card__title">Open Exceptions (30 Days)</h2>
    <div
      class="chart-card__canvas-wrap"
      role="img"
      aria-label="Line chart showing open exception count trend over the last 30 days"
    >
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style scoped>
.chart-card__canvas-wrap {
  height: 240px;
}
</style>
