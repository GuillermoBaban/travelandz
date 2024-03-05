import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";

function SelectComponent({ selectedCountry, onOptionSelected }) {
  const [showCity, setShowCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSelectChange = (event) => {
    onOptionSelected(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/diaries/get_codes_city",
        {
          method: "POST", // Cambiamos el método a POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ countryCode: selectedCountry }), // Aquí especificamos el countryCode que deseas enviar
        }
      );
      const data = await response.json();
      setShowCity(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [selectedCountry]);

  const handleClick = async () => {
    setError(false);
    if (showCity.length === 0) {
      setLoading(true);
      await fetchData();
      setLoading(false);
    }
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
          {showCity.map((country) => (
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
