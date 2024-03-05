import { useState } from "react";
import "./App.css";
import SelectCountry from "./components/SelectCountry";
import SelectFrom from "./components/SelectFrom";
import SelectCity from "./components/SelectCity";
import SelectHotel from "./components/SelectHotel";
import TranfersCards from "./components/TransferCard";
import ArrowBack from "./assets/ArrowBack";
import Spinner from "./components/Spinner";

function App() {
  const [selectFrom, setSelectFrom] = useState("");
  const [selectedCountryFrom, setSelectedCountryFrom] = useState("");
  const [selectedCityFrom, setSelectedCityFrom] = useState("");
  const [selectedHotelFrom, setSelectedHotelFrom] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const [selectTo, setSelectTo] = useState("");
  const [selectedCountryTo, setSelectedCountryTo] = useState("");
  const [selectedCityTo, setSelectedCityTo] = useState("");
  const [selectedHotelTo, setSelectedHotelTo] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [numberAdults, setNumberAdults] = useState(0);
  const [numberChildren, setNumberChildren] = useState(0);
  const [numberInfants, setNumberInfants] = useState(0);

  const [loadingForm, setLoadingForm] = useState(false);
  const [tranfers, setTransfers] = useState([]);

  function handleOptionFrom(option) {
    if (option !== "none") setSelectFrom(option);
    if (option == "ATLAS") setSelectFrom(option);
  }

  function handleOptionFormTo(option) {
    if (option !== "none") setSelectTo(option);
    if (option == "ATLAS") setSelectTo(option);
  }

  function handleArrowBackClick() {
    window.location.href = "/";
  }

  const handleSubmit = async (event) => {
    setLoadingForm(true);
    event.preventDefault();

    const formData = {
      selectFrom,
      selectedCountryFrom,
      selectedCityFrom,
      selectedHotelFrom,
      dateFrom,
      selectTo,
      selectedCountryTo,
      selectedCityTo,
      selectedHotelTo,
      dateTo,
      numberAdults,
      numberChildren,
      numberInfants,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/diaries/get_availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const tranfers = await response.json();
      setTransfers(tranfers);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setLoadingForm(false);
      // Aquí puedes manejar la respuesta si es necesario
    } catch (error) {
      setLoadingForm(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      {!loadingForm && tranfers.length === 0 && (
        <form method="post" onSubmit={handleSubmit}>
          <div className="text-3xl font-bold underline mt-10">
            <span className="text-center block mb-2 text-sm font-medium text-white">
              Desde donde sale
            </span>
            <SelectFrom onOptionSelected={handleOptionFrom} />
            {selectFrom && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  Country
                </span>
                <SelectCountry
                  onOptionSelected={(option) => setSelectedCountryFrom(option)}
                />
              </>
            )}
            {selectedCountryFrom && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  City
                </span>
                <SelectCity
                  onOptionSelected={(option) => setSelectedCityFrom(option)}
                  selectedCountry={selectedCountryFrom}
                />
              </>
            )}
            {selectedCityFrom && selectFrom == "ATLAS" && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  Hotel
                </span>
                <SelectHotel
                  onOptionSelected={(option) => setSelectedHotelFrom(option)}
                  selectedCity={selectedCityFrom}
                  selectedCountry={selectedCountryFrom}
                />
              </>
            )}
          </div>

          <div className="text-3xl font-bold underline">
            <span className="text-center block mt-4 text-sm font-medium text-white">
              A donde llega
            </span>
            <SelectFrom onOptionSelected={handleOptionFormTo} />
            {selectTo && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  Country
                </span>

                <SelectCountry
                  onOptionSelected={(option) => setSelectedCountryTo(option)}
                />
              </>
            )}
            {selectedCountryTo && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  City
                </span>
                <SelectCity
                  onOptionSelected={(option) => setSelectedCityTo(option)}
                  selectedCountry={selectedCountryTo}
                />
              </>
            )}
            {selectedCityTo && selectTo == "ATLAS" && (
              <>
                <span className="text-center block mb-2 text-sm font-medium text-white">
                  Hotel
                </span>
                <SelectHotel
                  onOptionSelected={(option) => setSelectedHotelTo(option)}
                  selectedCity={selectedCityTo}
                  selectedCountry={selectedCountryTo}
                />
              </>
            )}
          </div>
          {(selectTo == "ATLAS" && selectedHotelTo && selectedHotelFrom) ||
            (selectedCityTo && selectedCityFrom && (
              <>
                <div className="text-center flex justify-center">
                  <div className="mr-10">
                    <label
                      htmlFor="dateFrom"
                      className="block mt-2 text-sm font-medium text-white"
                    >
                      Fecha de salida
                    </label>
                    <input
                      style={{ color: "#737575" }}
                      className="mt-2 p-1 rounded-md"
                      type="datetime-local"
                      id="start"
                      name="trip-start"
                      min="2021-01-01"
                      max="2021-12-31"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateTo"
                      className="block mt-2 text-sm font-medium text-white"
                    >
                      Fecha de vuelta (opcional)
                    </label>
                    <input
                      style={{ color: "#737575" }}
                      className="mt-2 p-1 rounded-md"
                      type="datetime-local"
                      id="back"
                      name="trip-back"
                      min="2021-01-01"
                      max="2021-12-31"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ))}
          {dateFrom && (
            <div className="flex justify-center text-center">
              <div>
                <label
                  htmlFor="number-adults"
                  className="block mt-2 text-sm font-medium text-white"
                >
                  Number of adults (+18)
                </label>
                <input
                  type="number"
                  id="number-adults"
                  aria-describedby="helper-text-explanation"
                  className=" text-gray-900 rounded-lg p-2.5"
                  placeholder="2"
                  required
                  value={numberAdults}
                  onChange={(e) => setNumberAdults(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="number-children"
                  className="block mt-2 text-sm font-medium text-white"
                >
                  Number of children (4~17)
                </label>
                <input
                  type="number"
                  id="number-children"
                  aria-describedby="helper-text-explanation"
                  className=" text-gray-900 rounded-lg p-2.5 ml-10 mr-10"
                  placeholder="1"
                  required
                  value={numberChildren}
                  onChange={(e) => setNumberChildren(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="number-infants"
                  className="block mt-2 text-sm font-medium text-white"
                >
                  Number of infants (0~3)
                </label>
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className=" text-gray-900 rounded-lg p-2.5"
                  placeholder="2"
                  required
                  value={numberInfants}
                  onChange={(e) => setNumberInfants(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </div>
        </form>
      )}
      {loadingForm && <Spinner />}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 mt-5">
        {!loadingForm &&
          tranfers.length > 0 &&
          tranfers.map((transfer, index) => (
            <>
              <div className="absolute top-2">
                <button onClick={handleArrowBackClick}>
                  <ArrowBack /> {/* Ícono de flecha izquierda */}
                </button>
              </div>
              <TranfersCards key={index} transfer={transfer} />
            </>
          ))}
      </div>
    </div>
  );
}

export default App;
