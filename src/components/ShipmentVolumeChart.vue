<!-- ShipmentVolumeChart — Bar chart showing monthly shipment volume -->
<script setup lang="ts">
import { computed, inject } from 'vue'
import { Bar } from 'vue-chartjs'
import type { TooltipItem } from 'chart.js'
import type { MonthMetric } from '../composables/useMetrics'
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

const props = defineProps<{ filtered: MonthMetric[] }>()

const isDark = inject<() => boolean>('isDark')

const textColor = computed(() => isDark && isDark() ? '#cdb9fe' : '#4c1d95')
const gridColor = computed(() => isDark && isDark() ? 'rgba(167,139,250,0.14)' : 'rgba(109,40,217,0.08)')

const chartData = computed(() => ({
  labels: props.filtered.map(m => m.label),
  datasets: [
    {
      label: 'Shipments',
      data: props.filtered.map(m => m.shipmentVolume),
      backgroundColor: isDark && isDark()
        ? 'rgba(167,139,250,0.7)'
        : 'rgba(124,58,237,0.65)',
      borderColor: isDark && isDark()
        ? 'rgba(196,181,253,0.9)'
        : 'rgba(109,40,217,0.9)',
      borderWidth: 1.5,
      borderRadius: 6,
      hoverBackgroundColor: isDark && isDark()
        ? 'rgba(196,181,253,0.9)'
        : 'rgba(109,40,217,0.85)',
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 800, easing: 'easeInOutQuart' as const },
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
        label: (ctx: TooltipItem<'bar'>) => ` ${(ctx.parsed.y ?? 0).toLocaleString()} shipments`,
      },
    },
  },
  scales: {
    x: {
      grid: { color: gridColor.value },
      ticks: { color: textColor.value, font: { family: 'Inter', size: 12 } },
    },
    y: {
      grid: { color: gridColor.value },
      ticks: {
        color: textColor.value,
        font: { family: 'Inter', size: 12 },
        callback: (v: string | number) => `${Number(v).toLocaleString()}`,
      },
      beginAtZero: true,
    },
  },
}))
</script>

<template>
  <section class="card chart-card" aria-labelledby="shipment-volume-title">
    <h2 id="shipment-volume-title" class="chart-card__title">Shipment Volume</h2>
    <div class="chart-card__canvas-wrap" role="img" aria-label="Bar chart showing monthly shipment volume for the selected period">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style scoped>
.chart-card__canvas-wrap {
  height: 240px;
  transition: opacity var(--transition);
}

.chart-card__canvas-wrap:hover {
  opacity: 0.95;
}
</style>

