import numeral from "numeral";

export const formatChartData = data => {
  const cases = data["cases"];
  const labels = Object.keys(cases).slice(1);
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
      label: "Dialy new cases for last 30 days",
      backgroundColor: "darkgray",
      data: dataSet,
      fill: "origin"
    }
  ];
  return formatedData;
};

export const formatNumber = (num, format = "0.0a", extra = "+") =>
  `${extra}${numeral(num).format(format)}`;
