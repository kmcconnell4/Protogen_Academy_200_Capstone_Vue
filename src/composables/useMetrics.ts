import { computed, ref } from 'vue'
import allMetrics from '../data/metrics.json'

export interface MonthMetric {
  month: string
  label: string
  shipmentVolume: number
  onTimeRate: number
  openExceptions: number
  avgTransitDays: number
  regional: Record<string, number>
}

const metrics = allMetrics as MonthMetric[]

// Full date range bounds
export const MIN_MONTH = metrics[0].month               // '2025-04'
export const MAX_MONTH = metrics[metrics.length - 1].month // '2026-04'

// Selected range (reactive, shared across the dashboard)
export const selectedStart = ref(MIN_MONTH)
export const selectedEnd   = ref(MAX_MONTH)

export function useMetrics() {
  const filtered = computed<MonthMetric[]>(() =>
    metrics.filter(m => m.month >= selectedStart.value && m.month <= selectedEnd.value)
  )

  // KPI aggregates over the filtered window
  const totalShipments = computed(() =>
    filtered.value.reduce((sum, m) => sum + m.shipmentVolume, 0)
  )

  const avgOnTimeRate = computed(() => {
    if (!filtered.value.length) return 0
    return filtered.value.reduce((sum, m) => sum + m.onTimeRate, 0) / filtered.value.length
  })

  const totalExceptions = computed(() =>
    filtered.value.reduce((sum, m) => sum + m.openExceptions, 0)
  )

  const avgTransitDays = computed(() => {
    if (!filtered.value.length) return 0
    return filtered.value.reduce((sum, m) => sum + m.avgTransitDays, 0) / filtered.value.length
  })

  // Averaged regional performance over the window
  const regionalAvg = computed<Record<string, number>>(() => {
    if (!filtered.value.length) return {}
    const regions = Object.keys(filtered.value[0].regional)
    return Object.fromEntries(
      regions.map(r => [
        r,
        filtered.value.reduce((sum, m) => sum + m.regional[r], 0) / filtered.value.length,
      ])
    )
  })

  return {
    filtered,
    totalShipments,
    avgOnTimeRate,
    totalExceptions,
    avgTransitDays,
    regionalAvg,
  }
}
