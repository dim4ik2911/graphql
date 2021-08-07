const continentSelect = document.getElementById("continent-select");
const countryList = document.getElementById("countries-list");
const queryFetch = (query, variables) => {
  return fetch("https://countries.trevorblades.com/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
};

queryFetch(`query{
  continents {
    name
    code
  }
}`).then((data) => {
  // console.log(data.data);
  data.data.continents.forEach((continent) => {
    const option = document.createElement("option");
    option.value = continent.code;
    option.innerText = continent.name;
    continentSelect.append(option);
  });
});

const getContinentCountries = (continentCode) => {
  return queryFetch(
    `query getCountries($code: ID!) {
      continent(code: $code) {
        countries {
          name
        }
      }
    }`,
    { code: continentCode }
  );
  // .then((data) => {
  //   console.log(data);
  // });
};

continentSelect.addEventListener("change", async (e) => {
  const continentCode = e.target.value;
  const countriesData = await getContinentCountries(continentCode);
  const countries = countriesData.data.continent.countries;
  countryList.innerHTML = "";
  countries.forEach((country) => {
    const element = document.createElement("div");
    element.innerHTML = country.name;
    countryList.append(element);
  });
});
