<template>
  <div v-if="renderChart">
    <chart-item :chart-data="datacollection"></chart-item>
  </div>
</template>

<script>
import ChartItem from "../../charts/Chart.js";
import get from "../../api.js";
import { formatChartData } from "../../utils.js";

export default {
  components: {
    ChartItem
  },
  data: () => {
    return {
      datacollection: []
    };
  },

  computed: {
    renderChart() {
      return this.datacollection.datasets?.length;
    }
  },

  methods: {
    async grabData() {
      const response = await get("historical/all?lastdays=121");
      this.datacollection = formatChartData(response);
    }
  },

  async mounted() {
    await this.grabData();
  }
};
</script>
