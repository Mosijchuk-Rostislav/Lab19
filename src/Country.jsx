import React, { useState } from "react";
import CountryDetails from "./CountryDetails";
import CountryDetailsAll from "./CountryDetailsAll";

const Country = ({ country, start, index }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleMouseEnter = () => {
    if (country.name.common === "Russia") {
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
      alert("Помилка. Виявлено вірус! СБУ виїжає!");
    } else {
      setHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    if (country.name.common === "Russia") {
      alert("Помилка");
    } else {
      setClicked(!clicked);
    }
  };

  return (
    <div
      className={`country ${hovered ? "hovered" : ""} ${
        clicked ? "clicked" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="number">{start + index + 1}.</div>
      <div className="name">{country.name.common}</div>
      <div className="flag">
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
      {hovered && !clicked && <CountryDetails country={country} />}
      {clicked && <CountryDetailsAll country={country} />}
    </div>
  );
};

export default Country;
