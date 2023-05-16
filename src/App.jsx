import { useState, useEffect } from "react";
import "./App.css";
import Country from "./Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [reverseOrder, setReverseOrder] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
        setCountries([]);
      }
    };
    fetchData();
  }, []);

  const countriesPerPage = 10;
  const start = (page - 1) * countriesPerPage;
  const end = start + countriesPerPage;
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (sortType === "a-z") {
    filteredCountries.sort((a, b) =>
      sortDirection === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
  } else if (sortType === "region") {
    filteredCountries.sort((a, b) =>
      sortDirection === "asc"
        ? a.region.localeCompare(b.region)
        : b.region.localeCompare(a.region)
    );
  } else if (reverseOrder) {
    filteredCountries.reverse();
  }

  const currentCountries = filteredCountries.slice(start, end);
  const renderCountries = () => {
    return currentCountries.map((country, index) => (
      <Country
        country={country}
        start={start}
        index={index}
        reverseOrder={reverseOrder}
        key={index}
      />
    ));
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={i === page ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleReverseOrder = () => {
    setReverseOrder(!reverseOrder);
  };

  const handleSort = (type) => {
    if (type === sortType) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="sort-buttons">
        <button className="left-btn" onClick={handleReverseOrder}>
          {reverseOrder ? "Reverse Order" : "Original Order"}
        </button>
        <button
          onClick={() => handleSort("a-z")}
          className={sortType === "a-z" ? "active" : ""}
        >
          Sort А-Я
        </button>
        <button
          onClick={() => handleSort("region")}
          className={sortType === "region" ? "active" : ""}
        >
          Sort by Region
        </button>
        <button onClick={() => setSortType("")}>Reset Sort</button>
      </div>
      <div className="list">
        <strong>Country list:</strong>
      </div>
      <div className="countries">{renderCountries()}</div>
      <div className="pagination">{renderPagination()}</div>
      {selectedCountry && (
        <div className="modal">
          <div className="modal-content">
            <CountryDetails country={selectedCountry} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
