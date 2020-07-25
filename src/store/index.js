import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import get from "../api";
import { formatNumber } from "../utils";
import { StateTypeDictionary } from "../utils";

export default new Vuex.Store({
  state: {
    countries: [],
    selectedCountry: "worldwide",
    countryData: {},
    currentMapState: "cases",
    historicalData: null
  },
  getters: {
    stateColors: state => StateTypeDictionary[state.currentMapState],
    countries(state) {
      let countries = state.countries.map(country => ({
        text: country.country,
        value: country.countryInfo.iso2
      }));
      countries.unshift({ text: "worldwide", value: "worldwide" });
      return countries;
    },
    countryData(state) {
      let casesType = ["Cases", "Recovered", "Deaths"];
      let data = state.countryData;
      return casesType.map(type => {
        return {
          title: type,
          cases: formatNumber(data[`today${type}`]),
          total: formatNumber(data[`${type.toLowerCase()}`]),
          active: type.toLowerCase() === state.currentMapState.toLowerCase()
        };
      });
    },
    selectedCountry: state => state.selectedCountry,
    casesTableData: state => {
      return state.countries.map(country => {
        return {
          country: country.country,
          cases: formatNumber(country.cases, "0,0", "")
        };
      });
    },
    mapData: state => {
      return state.countries.map(cntry => ({
        countryName: cntry.country,
        countryFlag: cntry.countryInfo.flag,
        cases: cntry[state.currentMapState],
        caseColor: StateTypeDictionary[state.currentMapState].color,
        caseFillColor: StateTypeDictionary[state.currentMapState].fillColor,
        geoMertry: {
          lat: cntry.countryInfo.lat,
          long: cntry.countryInfo.long
        },
        summary: {
          active: formatNumber(cntry.active, "0,0", ""),
          deaths: formatNumber(cntry.deaths, "0,0", ""),
          recovered: formatNumber(cntry.recovered, "0,0", ""),
          todayCases: formatNumber(cntry.todayCases, "0,0", ""),
          tests: formatNumber(cntry.tests, "0,0", "")
        }
      }));
    },
    historicalData: state => state.historicalData[state.currentMapState]
  },
  mutations: {
    SET_COUNTRIES: (state, payload) => (state.countries = payload),
    SET_SELECTED_COUNTRY: (state, payload) => (state.selectedCountry = payload),
    SET_COUNTRY_DATA: (state, payload) => (state.countryData = payload),
    SET_MAP_STATE: (state, payload) => (state.currentMapState = payload),
    SET_HISTORICAL_DATA: (state, payload) => (state.historicalData = payload)
  },
  actions: {
    async getCountries({ commit }) {
      const data = await get("countries");
      commit("SET_COUNTRIES", data);
    },

    async getDataForCountry({ commit }, country = "worldwide") {
      commit("SET_SELECTED_COUNTRY", country);
      const url = country === "worldwide" ? "all" : `countries/${country}`;
      const data = await get(url);
      commit("SET_COUNTRY_DATA", data);
    },

    async getHistoricalData({ commit }, period = 120) {
      const response = await get(`historical/all?lastdays=${period}`);
      commit("SET_HISTORICAL_DATA", response);
    }
  }
});
