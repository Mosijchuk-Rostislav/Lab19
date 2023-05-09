import React from "react";

const CountryDetailsAll = ({ country }) => {
  const currencies = Object.values(country.currencies).map(
    (currency) => `${currency.name} (${currency.symbol})`
  );
  return (
    <div className="country-detailsAll">
      <div className="namesize">
        <h1>{country.name.common}</h1>
      </div>
      <div className="nationalPhoto">
        <div className="flex">
          <strong>Flags</strong>
          <img
            className="flags"
            src={country.flags.svg}
            alt={country.name.common}
          />
        </div>
        <div className="flex">
          <strong>Coat of Arms</strong>
          <img
            className="coatOfArms"
            src={country.coatOfArms.svg}
            alt={country.name.common}
          />
        </div>
      </div>
      <div>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] ?? "N/A"}
        </p>
        <p>
          <strong>Region:</strong> {country.region ?? "N/A"}
        </p>
        <p>
          <strong>Population:</strong>{" "}
          {country.population?.toLocaleString() ?? "N/A"}
        </p>
        <p>
          <strong>Area: </strong>
          {country.area ?? "N/A"}
        </p>
        <p>
          <strong>Continents: </strong>
          {country.continents ?? "N/A"}
        </p>
        <p>
          <strong>Traffic side: </strong>
          {country.car.side ?? "N/A"}
        </p>
        <p>
          <strong>Currencie:</strong> {currencies.join(", ") ?? "N/A"}
        </p>
      </div>
      <button>Back</button>
    </div>
  );
};
export default CountryDetailsAll;
