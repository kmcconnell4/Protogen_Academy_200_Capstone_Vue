<script setup lang="ts">
import MetricCard from '../components/MetricCard.vue'
import ShipmentVolumeChart from '../components/ShipmentVolumeChart.vue'
import OnTimeDeliveryChart from '../components/OnTimeDeliveryChart.vue'
import RegionalPerformanceChart from '../components/RegionalPerformanceChart.vue'
import OpenExceptionsChart from '../components/OpenExceptionsChart.vue'

const kpis = [
  {
    id: 'total-shipments',
    label: 'Total Shipments',
    value: '9,390',
    trend: '+12.4% vs last week',
    trendType: 'positive' as const,
    ariaLabel: 'Total shipments this week: 9,390, up 12.4% from last week',
  },
  {
    id: 'on-time-rate',
    label: 'On-Time Rate',
    value: '94.2%',
    trend: '+1.1 pts vs last week',
    trendType: 'positive' as const,
    ariaLabel: 'On-time delivery rate: 94.2%, up 1.1 points from last week',
  },
  {
    id: 'open-exceptions',
    label: 'Open Exceptions',
    value: '14',
    trend: '−18% vs last week',
    trendType: 'positive' as const,
    ariaLabel: 'Open exceptions: 14, down 18% from last week',
  },
  {
    id: 'avg-transit',
    label: 'Avg Transit Days',
    value: '2.3',
    trend: 'No change',
    trendType: 'neutral' as const,
    ariaLabel: 'Average transit days: 2.3, unchanged from last week',
  },
]
</script>

<template>
  <main class="app-main" id="main-content">
    <!-- Page heading (screen reader) -->
    <h1 class="sr-only">FastForward Executive Dashboard</h1>

    <!-- KPI strip -->
    <section class="kpi-strip" aria-label="Key performance indicators">
      <MetricCard
        v-for="kpi in kpis"
        :key="kpi.id"
        :label="kpi.label"
        :value="kpi.value"
        :trend="kpi.trend"
        :trend-type="kpi.trendType"
        :aria-label="kpi.ariaLabel"
      />
    </section>

    <!-- Charts grid -->
    <section class="charts-grid" aria-label="Dashboard charts">
      <div class="charts-grid__full">
        <ShipmentVolumeChart />
      </div>
      <div class="charts-grid__half">
        <OnTimeDeliveryChart />
      </div>
      <div class="charts-grid__half">
        <OpenExceptionsChart />
      </div>
      <div class="charts-grid__full">
        <RegionalPerformanceChart />
      </div>
    </section>
  </main>
</template>

<style scoped>
/* KPI strip */
.kpi-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Charts grid */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.charts-grid__full {
  grid-column: 1 / -1;
}

.charts-grid__half {
  grid-column: span 1;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .charts-grid__half {
    grid-column: 1 / -1;
  }
}
</style>
