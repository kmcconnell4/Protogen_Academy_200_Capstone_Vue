<!-- OnTimeDeliveryChart — Doughnut chart showing on-time vs late delivery rate -->
<script setup lang="ts">
import { computed, inject } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{ avgRate: number }>()

const isDark = inject<() => boolean>('isDark')

const rate = computed(() => Math.round(props.avgRate * 10) / 10)

const chartData = computed(() => ({
  labels: ['On Time', 'Late'],
  datasets: [
    {
      data: [rate.value, 100 - rate.value],
      backgroundColor: [
        isDark && isDark() ? 'rgba(74,222,128,0.8)' : 'rgba(22,163,74,0.75)',
        isDark && isDark() ? 'rgba(248,113,113,0.5)' : 'rgba(185,28,28,0.4)',
      ],
      borderColor: [
        isDark && isDark() ? '#4ade80' : '#16a34a',
        isDark && isDark() ? '#f87171' : '#b91c1c',
      ],
      borderWidth: 2,
      hoverBackgroundColor: [
        isDark && isDark() ? 'rgba(74,222,128,1)' : 'rgba(22,163,74,0.95)',
        isDark && isDark() ? 'rgba(248,113,113,0.8)' : 'rgba(185,28,28,0.65)',
      ],
      hoverOffset: 8,
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  animation: { duration: 900, easing: 'easeInOutQuart' as const },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: isDark && isDark() ? '#cdb9fe' : '#4c1d95',
        font: { family: 'Inter', size: 12 },
        padding: 16,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: isDark && isDark() ? '#0e0c1f' : '#fff',
      titleColor: isDark && isDark() ? '#cdb9fe' : '#4c1d95',
      bodyColor: isDark && isDark() ? '#f0ebff' : '#1e1b4b',
      borderColor: isDark && isDark() ? 'rgba(167,139,250,0.35)' : 'rgba(124,58,237,0.2)',
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx: { parsed: number }) => ` ${ctx.parsed.toFixed(1)}%`,
      },
    },
  },
}))
</script>

<template>
  <section class="card chart-card" aria-labelledby="on-time-title">
    <h2 id="on-time-title" class="chart-card__title">On-Time Delivery Rate</h2>
    <div class="chart-card__center-stat" aria-hidden="true">
      <span class="chart-card__big-number">{{ rate }}%</span>
      <span class="chart-card__sub">on time</span>
    </div>
    <div
      class="chart-card__canvas-wrap chart-card__canvas-wrap--doughnut"
      role="img"
      :aria-label="`Doughnut chart: ${rate}% of deliveries were on time`"
    >
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<style scoped>
.chart-card {
  position: relative;
}

.chart-card__center-stat {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -20%);
  text-align: center;
  pointer-events: none;
  z-index: 1;
}

.chart-card__big-number {
  display: block;
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--positive);
  line-height: 1;
}

.chart-card__sub {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.125rem;
}

.chart-card__canvas-wrap--doughnut {
  height: 260px;
}
</style>
