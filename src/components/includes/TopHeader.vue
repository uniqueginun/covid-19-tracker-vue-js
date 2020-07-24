<template>
  <v-row class="d-flex justify-space-between align-start">
    <v-col>
      <div class="text-h5 font-weight-bold" v-text="headerTitle"></div>
    </v-col>
    <v-col md="3" class="d-flex" cols="12" sm="6">
      <v-select
        v-model="country"
        @change="countrySelected"
        :items="countries"
        label="select country"
        solo
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => {
    return {
      headerTitle: "Covid 19 Tracker",
      country: "worldwide"
    };
  },

  computed: {
    ...mapGetters({
      countries: "countries",
      selectedCountry: "selectedCountry"
    })
  },

  methods: {
    countrySelected(country) {
      this.$store.dispatch("getDataForCountry", country);
    }
  }
};
</script>
