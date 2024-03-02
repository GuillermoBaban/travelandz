import { useState } from "react";
import Spinner from "../components/Spinner";

function ConfirmDialog({ open, onClose, transfer }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientReference, setClientReference] = useState("");

  const [loadingForm, setLoadingForm] = useState(false);

  const [transferDetailType, setTransferDetailType] = useState("");
  const [transferDetailCode, setTransferDetailCode] = useState("");
  const [transferDetailCompany, setTransferDetailCompany] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setLoadingForm(true);

    const formData = {
      name,
      surname,
      email,
      phone,
      clientReference,
      transfer,
      transferDetailType,
      transferDetailCode,
      transferDetailCompany,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/diaries/confirm_transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const r = await response.json();

      console.log(r);
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
    <div
      className={`
            fixed inset-0 flex justify-center items-center transition-colors text-black
            ${open ? "visible bg-black/60" : "invisible"}
          `}
    >
      {!loadingForm ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
              bg-white rounded-xl shadow px-6 py-1 transition-all
              ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
          style={{ width: "50%" }}
        >
          <form method="post" onSubmit={handleSubmit}>
            <div>
              <h2 className="text-3xl font-bold mb-2">Confirm transfer</h2>
              <hr />
              <h3 className="font-bold my-5 underline">Personal information</h3>
              <div>
                <label htmlFor="name" className="text-sm block font-bold">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-1 rounded-md border"
                  required
                />
                <div>
                  <label htmlFor="surname" className="text-sm block font-bold">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="mt-2 p-1 rounded-md border"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm block font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 p-1 rounded-md border"
                    required
                  />
                  <div>
                    <label htmlFor="phone" className="text-sm block font-bold">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-2 p-1 rounded-md border"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="clientReference"
                      className="text-sm block font-bold"
                    >
                      Client reference
                    </label>
                    <input
                      type="text"
                      id="clientReference"
                      name="clientReference"
                      value={clientReference}
                      onChange={(e) => setClientReference(e.target.value)}
                      className="mt-2 p-1 rounded-md border"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold my-5 underline">Travel info</h3>
              <div>
                <select
                  id="transferDetailType"
                  className="text-gray-900 text-sm rounded-lg w-60 p-2.5 border"
                  onChange={(e) => setTransferDetailType(e.target.value)}
                  defaultValue={""}
                  required
                >
                  <option value="" disabled hidden>
                    Select an option
                  </option>
                  <option value="FLIGHT">Flight</option>
                  <option value="CRUISE">Cruise</option>
                  <option value="TRAIN">Train</option>
                </select>
              </div>
              <label htmlFor="code" className="text-sm block font-bold">
                Ride identification number
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={transferDetailCode}
                onChange={(e) => setTransferDetailCode(e.target.value)}
                className="mt-2 p-1 rounded-md border"
                required
                maxLength={7}
              />
              <label htmlFor="company" className="text-sm block font-bold">
                Company name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={transferDetailCompany}
                onChange={(e) => setTransferDetailCompany(e.target.value)}
                className="mt-2 p-1 rounded-md border"
                required
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                type="button"
                onClick={onClose}
                className="mb-1 bg-red-400 hover:bg-blue-700 text-white font-bold px-4 rounded-full"
                style={{ width: "30%" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 mb-1 bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full"
                style={{ width: "30%" }}
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default ConfirmDialog;
