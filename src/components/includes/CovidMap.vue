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
          :radius="getCircleRadius(cntry.cases)"
          :fillColor="cntry.caseColor"
          :fillOpacity="0.5"
          :color="cntry.caseFillColor"
        >
          <l-popup>
            <div>
              <img :src="cntry.countryFlag" width="100%" height="40" />
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
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
    };
  },
  methods: {
    getCircleRadius: cases => Math.sqrt(cases * 1000000),
    zoomUpdate(zoom) {
      this.$store.commit("ZOOM_UPDATE", zoom);
    },
    centerUpdate(center) {
      this.$store.commit("CENTER_UPDATE", center);
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
      mapData: "mapData",
      currentLatLong: "currentLatLong",
      zoom: "zoom",
      center: "center",
      currentZoom: "currentZoom",
      currentCenter: "currentCenter"
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
