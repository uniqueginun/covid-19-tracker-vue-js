<template>
  <div v-if="renderChart">
    <chart-item :chart-data="datacollection"></chart-item>
  </div>
</template>

<script>
import ChartItem from "../../charts/Chart.js";
import { formatChartData } from "../../utils.js";

export default {
  components: {
    ChartItem
  },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    renderChart() {
      return !this.loading; // this.datacollection.datasets?.length;
    },
    datacollection() {
      return formatChartData(this.$store.getters.historicalData);
    }
  },

  methods: {
    async grabData() {
      await this.$store.dispatch("getHistoricalData");
      this.loading = false;
    }
  },

  async mounted() {
    await this.grabData();
  }
};
</script>
