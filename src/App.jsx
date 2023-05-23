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
  const [showRegions, setShowRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [resetSort, setResetSort] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://46.101.96.179/all");
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
    return (
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedRegion === "" || country.region === selectedRegion) &&
      (selectedSubregion === "" || country.subregion === selectedSubregion)
    );
  });

  if (resetSort) {
    setResetSort(false);
    filteredCountries.sort((a, b) =>
      reverseOrder
        ? b.name.common.localeCompare(a.name.common)
        : a.name.common.localeCompare(b.name.common)
    );
  }

  if (sortType === "a-z") {
    filteredCountries.sort((a, b) =>
      sortDirection === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
  } else if (reverseOrder) {
    filteredCountries.reverse();
  }

  const currentCountries = filteredCountries.slice(start, end);
  const renderCountries = () => {
    if (filteredCountries.length === 0) {
      return (
        <p>
          No countries found for the selected region and subregion combination.
        </p>
      );
    }
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

  function RegionList() {
    const regions = Array.from(
      new Set(countries.map((country) => country.region))
    ).filter((region) => region !== "");

    const subregions = Array.from(
      new Set(
        countries
          .filter((country) => country.region === selectedRegion)
          .map((country) => country.subregion)
      )
    ).filter((subregion) => subregion !== "");

    return (
      <div className="region">
        <ul className="region-list">
          <h2>Region:</h2>
          {regions.map((region, index) => (
            <button key={index} onClick={() => handleRegionSelect(region)}>
              {region}
            </button>
          ))}
        </ul>
        {selectedRegion && (
          <ul className="subregion-list">
            <h2>Subregion:</h2>
            {subregions.map((subregion, index) => (
              <button
                key={index}
                onClick={() => setSelectedSubregion(subregion)}
                className={selectedSubregion === subregion ? "active" : ""}
              >
                {subregion}
              </button>
            ))}
          </ul>
        )}
      </div>
    );
  }

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
    const pages = [];
  
    if (totalPages <= 1) {
      return null; // Don't render pagination if there's only one page
    }
  
    const showEllipsis = totalPages > 5;
  
    if (page > 1) {
      pages.push(
        <button key="prev" onClick={() => setPage(page - 1)}>
          Back
        </button>
      );
    }
  
    let startPage, endPage;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (page <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (page >= totalPages - 2) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = page - 2;
        endPage = page + 2;
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
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
  
    if (showEllipsis && endPage < totalPages - 1) {
      pages.push(<span key="ellipsis">...</span>);
    }
  
    if (totalPages > 5 && endPage < totalPages) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => setPage(totalPages)}
          className={page === totalPages ? "active" : ""}
        >
          {totalPages}
        </button>
      );
    }
  
    if (page < totalPages) {
      pages.push(
        <button key="next" onClick={() => setPage(page + 1)}>
          Next
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
      setSelectedRegion("");
      setSelectedSubregion("");
      setResetSort(false);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSelectedSubregion("");
    setShowRegions(false);
  };

  return (
    <div className="container">
      <input
        className="search"
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
        <button onClick={() => setShowRegions(!showRegions)}>
          Show Regions
        </button>
        {showRegions && <RegionList />}
        <button
          onClick={() => {
            setSortType("");
            setSortDirection("asc");
            setSelectedRegion("");
            setSelectedSubregion("");
            setResetSort(true);
          }}
          className={resetSort ? "active" : ""}
        >
          Reset Sort
        </button>
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
