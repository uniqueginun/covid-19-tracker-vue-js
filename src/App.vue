<template>
  <v-app class="app__main">
    <v-main>
      <CovidTrackerMain />
    </v-main>
    <FooterInfo />
  </v-app>
</template>

<script>
import CovidTrackerMain from "./components/CovidTrackerMain";
import FooterInfo from "./components/FooterInfo.vue";

export default {
  name: "App",

  components: {
    CovidTrackerMain,
    FooterInfo
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
