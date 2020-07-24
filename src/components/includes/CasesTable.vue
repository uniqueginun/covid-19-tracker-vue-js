<template>
  <v-card>
    <v-card-title>
      Live Cases
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search By Country"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :footer-props="{
        itemsPerPageOptions: [5]
      }"
      :items-per-page="5"
      :headers="headers"
      :items="casesTableData"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Country",
          align: "start",
          value: "country"
        },
        { text: "Cases", value: "cases", align: "end" }
      ]
    };
  },
  computed: {
    casesTableData() {
      return this.$store.getters.casesTableData;
    }
  }
};
</script>
