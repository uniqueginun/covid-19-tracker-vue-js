<template>
  <v-app class="app__main">
    <v-main>
      <CovidTrackerMain />
    </v-main>
  </v-app>
</template>

<script>
import CovidTrackerMain from "./components/CovidTrackerMain";

export default {
  name: "App",

  components: {
    CovidTrackerMain
  },

  data: () => ({
    //
  }),

  methods: {
    async fetchCovidData() {
      await this.$store.dispatch("getCountries");
      await this.$store.dispatch("getDataForCountry");
    }
  },

  mounted() {
    this.fetchCovidData();
  }
};
</script>

<style scoped>
.app__main {
  padding: 1rem 2rem;
}
</style>
