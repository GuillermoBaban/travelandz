import React, { useState, useMemo } from "react";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";

function SelectComponent({ onOptionSelected }) {
  const [showCountries, setShowCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/diaries/get_codes_country"
      );
      const data = await response.json();
      setShowCountries(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useMemo(() => {
    if (showCountries.length === 0) {
      fetchCountries();
    }
  }, [showCountries]);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    onOptionSelected(selectedOption);
  };

  const handleClick = () => {
    setError(false);
    setLoading(true);
    if (showCountries.length === 0) fetchCountries();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      {error && <ErrorComponent setError={setError} />}

      <div className="max-w-sm mx-auto">
        <select
          id="secondSelect"
          className="text-gray-900 text-sm rounded-lg w-full p-2.5 mt-4"
          onChange={handleSelectChange}
          defaultValue={""}
          required
          onClick={handleClick}
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
    </div>
  );
}

export default SelectComponent;
