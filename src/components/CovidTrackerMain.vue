<template>
  <div class="app__header">
    <v-container fluid>
      <v-row>
        <v-col>
          <TopHeader />
          <InfoBoxes />
          <CovidMap />
        </v-col>
        <v-col md="4">
          <Statistics />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopHeader from "./includes/TopHeader.vue";
import InfoBoxes from "./includes/InfoBoxes.vue";
import Statistics from "./includes/Statistics.vue";
import CovidMap from "./includes/CovidMap";

export default {
  components: {
    TopHeader,
    InfoBoxes,
    Statistics,
    CovidMap
  }
};
</script>
