import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import get from "../api";

export default new Vuex.Store({
  state: {
    countries: [],
    selectedCountry: "worldwide",
    countryData: {}
  },
  getters: {
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
          cases: data[`today${type}`],
          total: data[`${type.toLowerCase()}`]
        };
      });
    },
    selectedCountry: state => state.selectedCountry,
    casesTableData: state => {
      return state.countries.map(country => {
        return {
          country: country.country,
          cases: country.cases
        };
      });
    },
    mapData: state => {
      return state.countries.map(cntry => ({
        countryName: cntry.country,
        countryFlag: cntry.countryInfo.flag,
        cases: cntry.cases,
        geoMertry: {
          lat: cntry.countryInfo.lat,
          long: cntry.countryInfo.long
        },
        summary: {
          active: cntry.active,
          deaths: cntry.deaths,
          recovered: cntry.recovered,
          todayCases: cntry.todayCases,
          tests: cntry.tests
        }
      }));
    }
  },
  mutations: {
    SET_COUNTRIES: (state, payload) => (state.countries = payload),
    SET_SELECTED_COUNTRY: (state, payload) => (state.selectedCountry = payload),
    SET_COUNTRY_DATA: (state, payload) => (state.countryData = payload)
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
    }
  }
});
