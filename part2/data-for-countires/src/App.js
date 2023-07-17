import { useState, useEffect } from "react";
import countriesService from "./services/countries";

const App = () => {
  const [countriesSearch, setCountriesSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [specificCountry, setSpecificCountry] = useState("");

  useEffect(() => {
    countriesService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (countries === null) {
      return;
    }
    setFilteredCountries(
      countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(countriesSearch.toLowerCase());
      })
    );
  }, [countries, countriesSearch]);

  useEffect(() => {
    if (filteredCountries === null) {
      return;
    }
    if (filteredCountries.length === 1) {
      countriesService
        .getCountry(filteredCountries[0].name.common.toLowerCase())
        .then((response) => {
          setSpecificCountry(response.data);
        });
    }
  });

  const handleCountrySearch = (event) => {
    setCountriesSearch(event.target.value);
  };

  return (
    <div>
      <h1>Data for Countries</h1>
      <div>
        Find countries:{" "}
        <input value={countriesSearch} onChange={handleCountrySearch} />
      </div>
      <div>
        <ul>
          {filteredCountries &&
            filteredCountries.length <= 10 &&
            filteredCountries.length > 1 &&
            filteredCountries.map((country) => {
              return <li key={country.name.common}>{country.name.common}</li>;
            })}
          {filteredCountries && filteredCountries.length > 10 && (
            <li>Too many matches, specify another filter</li>
          )}
          {filteredCountries &&
            filteredCountries.length === 1 &&
            specificCountry && (
              <div>
                <h1>{specificCountry.name.common}</h1>
                <p>capital {specificCountry.capital[0]}</p>
                <p>area {specificCountry.area}</p>
                <h2>languages:</h2>
                <ul>
                  {Object.keys(specificCountry.languages).map((language) => {
                    return (
                      <li key={language}>
                        {specificCountry.languages[language]}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
        </ul>
      </div>
    </div>
  );
};

export default App;
