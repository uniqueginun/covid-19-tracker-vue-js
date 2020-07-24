<template>
  <div>
    <v-row>
      <v-col>
        <CasesTable />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ChartData />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CasesTable from "./CasesTable";
import ChartData from "./ChartData";
export default {
  components: {
    CasesTable,
    ChartData
  }
};
</script>
