<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in countryData" :key="index">
        <v-card class="mx-auto" max-width="344">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-2">{{ item.title }}</div>
              <v-list-item-title class="text-h6 mb-2">{{
                item.cases
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.total }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      countryData: "countryData"
    })
  }
};
</script>
