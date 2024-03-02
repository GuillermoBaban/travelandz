import React from "react";
import { useState, useMemo } from "react";
import Spinner from "./Spinner";

function SelectComponent({ onOptionSelected }) {
  const [showCountries, setShowCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    onOptionSelected(selectedOption);
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/diaries/get_codes_country"
      );
      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useMemo(async () => {
    const fetchedCountries = await fetchCountries();
    setShowCountries(fetchedCountries);
    setLoading(false);
    return fetchedCountries;
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto">
      <select
        id="secondSelect"
        className="text-gray-900 text-sm rounded-lg w-full p-2.5 mt-4"
        onChange={handleSelectChange}
        defaultValue={""}
        required
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {showCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
