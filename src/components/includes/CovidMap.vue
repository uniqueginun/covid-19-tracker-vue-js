<template>
  <v-container class="map__container">
    <v-card class="mx-auto map__card" outlined>
      <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-circle
          v-for="(cntry, index) in mapData"
          :key="index"
          :lat-lng="getLongLat(cntry.geoMertry)"
          :weight="2"
          :radius="Math.sqrt(cntry.cases * 20000)"
          fillColor="#f56565"
          :fillOpacity="0.5"
          color="#e53e3e"
        >
          <l-popup>
            <div>
              <p>
                Name: {{ cntry.countryName }}
                <br />
                Cases: {{ cntry.cases }}
                <br />
                Active: {{ cntry.summary.active }}
                <br />
                Recovered: {{ cntry.summary.recovered }}
                <br />
                Deaths: {{ cntry.summary.deaths }}
                <br />
                Today Cases: {{ cntry.summary.todayCases }}
                <br />
                Tests: {{ cntry.summary.tests }}
                <br />
              </p>
            </div>
          </l-popup>
        </l-circle>
      </l-map>
    </v-card>
  </v-container>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LPopup, LCircle } from "vue2-leaflet";
import { mapGetters } from "vuex";

export default {
  components: {
    LMap,
    LTileLayer,
    LPopup,
    LCircle
  },
  data() {
    return {
      zoom: 3,
      center: latLng(21.3891, 39.8579),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(21.3891, 39.8579),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(21.3891, 39.8579),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    getLongLat: ({ lat, long }) => latLng(lat, long)
  },
  computed: {
    ...mapGetters({
      mapData: "mapData"
    })
  }
};
</script>

<style scoped>
.map__container,
.leaflet-container {
  height: 100% !important;
}
.map__card {
  height: 600px;
}
</style>
