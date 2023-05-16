import React from "react";

const CountryDetails = ({ country }) => {
  return (
    <div className="country-details">
      <h1>{country.name.common}</h1>
      <img src={country.flags.svg} alt={country.name.common} />
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
    </div>
  );
};

export default CountryDetails;
