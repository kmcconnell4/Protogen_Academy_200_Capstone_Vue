<script setup lang="ts">
import { computed } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import ShipmentVolumeChart from '../components/ShipmentVolumeChart.vue'
import OnTimeDeliveryChart from '../components/OnTimeDeliveryChart.vue'
import RegionalPerformanceChart from '../components/RegionalPerformanceChart.vue'
import OpenExceptionsChart from '../components/OpenExceptionsChart.vue'
import { useMetrics } from '../composables/useMetrics'

const { filtered, totalShipments, avgOnTimeRate, totalExceptions, avgTransitDays } = useMetrics()

function trendVsPrev(current: number, previous: number, lowerIsBetter = false): { text: string; type: 'positive' | 'negative' | 'neutral' } {
  if (previous === 0) return { text: 'No data', type: 'neutral' }
  const pct = ((current - previous) / previous) * 100
  if (Math.abs(pct) < 0.1) return { text: 'No change', type: 'neutral' }
  const sign = pct > 0 ? '+' : ''
  const isGood = lowerIsBetter ? pct < 0 : pct > 0
  return {
    text: `${sign}${pct.toFixed(1)}% vs prior period`,
    type: isGood ? 'positive' : 'negative',
  }
}

// Compare first half vs second half of selected window for trends
const midpoint = computed(() => Math.floor(filtered.value.length / 2))

const shipmentTrend = computed(() => {
  const n = midpoint.value
  if (!n) return { text: 'No data', type: 'neutral' as const }
  const first = filtered.value.slice(0, n).reduce((s, m) => s + m.shipmentVolume, 0)
  const second = filtered.value.slice(n).reduce((s, m) => s + m.shipmentVolume, 0)
  return trendVsPrev(second, first)
})

const onTimeTrend = computed(() => {
  const n = midpoint.value || 1
  const firstAvg = filtered.value.slice(0, n).reduce((s, m) => s + m.onTimeRate, 0) / n
  const secondN = filtered.value.length - n || 1
  const secondAvg = filtered.value.slice(n).reduce((s, m) => s + m.onTimeRate, 0) / secondN
  const diff = secondAvg - firstAvg
  if (Math.abs(diff) < 0.05) return { text: 'No change', type: 'neutral' as const }
  return {
    text: `${diff > 0 ? '+' : ''}${diff.toFixed(1)} pts vs prior period`,
    type: (diff > 0 ? 'positive' : 'negative') as 'positive' | 'negative',
  }
})

const exceptionTrend = computed(() => {
  const n = midpoint.value
  if (!n) return { text: 'No data', type: 'neutral' as const }
  const first = filtered.value.slice(0, n).reduce((s, m) => s + m.openExceptions, 0)
  const second = filtered.value.slice(n).reduce((s, m) => s + m.openExceptions, 0)
  return trendVsPrev(second, first || 1, true)
})

const transitTrend = computed(() => {
  const n = midpoint.value || 1
  const firstAvg = filtered.value.slice(0, n).reduce((s, m) => s + m.avgTransitDays, 0) / n
  const secondN = filtered.value.length - n || 1
  const secondAvg = filtered.value.slice(n).reduce((s, m) => s + m.avgTransitDays, 0) / secondN
  const diff = secondAvg - firstAvg
  if (Math.abs(diff) < 0.01) return { text: 'No change', type: 'neutral' as const }
  return {
    text: `${diff > 0 ? '+' : ''}${diff.toFixed(2)} days vs prior period`,
    type: (diff < 0 ? 'positive' : 'negative') as 'positive' | 'negative',
  }
})

const rangeLabel = computed(() => {
  if (!filtered.value.length) return ''
  return `${filtered.value[0].label} – ${filtered.value[filtered.value.length - 1].label}`
})
</script>

<template>
  <v-main id="main-content" class="dashboard-main">
    <h1 class="sr-only">FastForward Executive Dashboard</h1>

    <v-container fluid class="pa-4 pa-md-6">

      <!-- Range label -->
      <p class="dashboard-range" aria-live="polite">{{ rangeLabel }}</p>

      <!-- KPI row -->
      <v-row class="mb-4" aria-label="Key performance indicators" role="region">
        <v-col cols="12" sm="6" lg="3">
          <MetricCard
            label="Total Shipments"
            :value="totalShipments.toLocaleString()"
            :trend="shipmentTrend.text"
            :trend-type="shipmentTrend.type"
            :aria-label="`Total shipments: ${totalShipments.toLocaleString()}`"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <MetricCard
            label="Avg On-Time Rate"
            :value="`${avgOnTimeRate.toFixed(1)}%`"
            :trend="onTimeTrend.text"
            :trend-type="onTimeTrend.type"
            :aria-label="`Average on-time rate: ${avgOnTimeRate.toFixed(1)}%`"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <MetricCard
            label="Total Exceptions"
            :value="totalExceptions.toLocaleString()"
            :trend="exceptionTrend.text"
            :trend-type="exceptionTrend.type"
            :aria-label="`Total open exceptions: ${totalExceptions}`"
          />
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <MetricCard
            label="Avg Transit Days"
            :value="avgTransitDays.toFixed(2)"
            :trend="transitTrend.text"
            :trend-type="transitTrend.type"
            :aria-label="`Average transit days: ${avgTransitDays.toFixed(2)}`"
          />
        </v-col>
      </v-row>

      <!-- Charts: Shipment Volume full width -->
      <v-row class="mb-4" aria-label="Dashboard charts" role="region">
        <v-col cols="12">
          <ShipmentVolumeChart :filtered="filtered" />
        </v-col>
      </v-row>

      <!-- Charts: On-Time + Exceptions side by side -->
      <v-row class="mb-4">
        <v-col cols="12" md="6">
          <OnTimeDeliveryChart :avg-rate="avgOnTimeRate" />
        </v-col>
        <v-col cols="12" md="6">
          <OpenExceptionsChart :filtered="filtered" />
        </v-col>
      </v-row>

      <!-- Charts: Regional full width -->
      <v-row>
        <v-col cols="12">
          <RegionalPerformanceChart :filtered="filtered" />
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<style scoped>
.dashboard-main {
  background: transparent !important;
}

.dashboard-range {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
</style>

