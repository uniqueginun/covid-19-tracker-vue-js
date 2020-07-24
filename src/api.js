const baseApiUrl = "https://disease.sh/v3/covid-19";

const get = async uri => {
  const response = await fetch(`${baseApiUrl}/${uri}`);
  const data = await response.json();
  return data;
};

export default get;
