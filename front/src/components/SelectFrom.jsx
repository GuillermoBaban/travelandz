import React from "react";

function SelectComponent({ onOptionSelected }) {
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    onOptionSelected(selectedOption);
  };

  return (
    <div className="max-w-sm mx-auto">
      <select
        id="countries"
        className="text-gray-900 text-sm rounded-lg w-full p-2.5"
        onChange={handleSelectChange}
        defaultValue={""}
        required
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        <option value="IATA">Airport</option>
        <option value="ATLAS">Hotel</option>
      </select>
    </div>
  );
}

export default SelectComponent;
