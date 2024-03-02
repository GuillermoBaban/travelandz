import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "./Spinner";

function SelectComponent({ onOptionSelected, selectedCity, selectedCountry }) {
  const [showHotel, setShowHotel] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    onOptionSelected(selectedOption);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/diaries/get_hotels",
          {
            method: "POST", // Cambiamos el método a POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              countryCode: selectedCountry,
              cityCode: selectedCity,
            }), // Aquí especificamos el countryCode que deseas enviar
          }
        );
        const data = await response.json();
        setShowHotel(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedCountry, selectedCity]);

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
        {showHotel.map((hotel) => (
          <option key={hotel.code} value={hotel.code}>
            {hotel.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;
