import { useState } from "react";

function InfoConfirm({ response, onClose }) {
  const [openModal, setOpenModal] = useState(true);

  const handleCancel = () => {
    setOpenModal(false);
    onClose();
  };

  return (
    <div
      className={`bg-white rounded-xl shadow px-6 py-1 transition-all ${
        openModal ? "visible" : "invisible"
      } `}
    >
      <h2 className="text-3xl font-bold mb-2">Confirm</h2>
      <p>Status: {response.status}</p>
      <p>Reference: {response.reference}</p>
      <p>Total amount: {response.totalAmount}</p>
      <div className="flex justify-between mt-5">
        <button
          type="button"
          onClick={handleCancel}
          className="w-10/12 mb-1 mr-1 bg-red-400 hover:bg-blue-700 text-white font-bold py-1 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default InfoConfirm;
