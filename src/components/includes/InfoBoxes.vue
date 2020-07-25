<template>
  <v-container>
    <v-row>
      <v-col v-for="(item, index) in countryData" :key="index">
        <v-card
          @click="setMapState(item)"
          class="mx-auto card-item"
          max-width="344"
          :style="{
            borderTop: item.active
              ? `4px solid ${$store.getters.stateColors.fillColor}`
              : 'none'
          }"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-2">{{ item.title }}</div>
              <v-list-item-title class="text-h4 mb-2 cases-current">{{
                item.cases
              }}</v-list-item-title>
              <v-list-item-subtitle
                >{{ item.total }} Total</v-list-item-subtitle
              >
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
  },

  methods: {
    setMapState(item) {
      this.$store.commit("SET_MAP_STATE", item.title.toLowerCase());
    }
  }
};
</script>

<style scoped>
.cases-current {
  color: #ff1744;
}
.card-item {
  cursor: pointer;
}
</style>
