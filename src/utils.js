import numeral from "numeral";
import store from "./store";

export const formatChartData = (cases, color = "darkgray") => {
  const labels = Object.keys(cases).slice(1);
  const { selectedCountry, currentMapState } = store.getters;
  let dataSet = [];
  let prevItemValue;
  for (const dateItem in cases) {
    if (prevItemValue) {
      dataSet.push(cases[dateItem] - prevItemValue);
    }
    prevItemValue = cases[dateItem];
  }
  let formatedData = {};
  formatedData.labels = labels;
  formatedData.datasets = [
    {
      label: `${selectedCountry} daily new ${currentMapState} for last 30 days`,
      backgroundColor: color,
      data: dataSet,
      fill: "origin"
    }
  ];
  return formatedData;
};

export const formatNumber = (num, format = "0.0a", extra = "+") =>
  `${num && extra}${numeral(num).format(format)}`;

export const StateTypeDictionary = {
  cases: {
    color: "#FFEE58",
    fillColor: "#FDD835"
  },
  recovered: {
    color: "#00E676",
    fillColor: "#76FF03"
  },
  deaths: {
    color: "#f56565",
    fillColor: "#e53e3e"
  }
};
