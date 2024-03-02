import { useState } from "react";
import ConfirmDialog from "../dialogs/ConfirmDialog";

function TranfersCards({ transfer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-sm rounded-lg p-3 border-2 border-gray-400	">
      {transfer.content.images.length > 0 && (
        <img
          className="w-full"
          src={transfer.content.images[0].url}
          alt="tranfer image"
        />
      )}
      <div className=" py-4">
        <div className="font-bold text-xl mb-2">{transfer.vehicle.name}</div>
        <p className="text-base">
          Max capacity: {transfer.maxPaxCapacity} passengers
        </p>
        <p className="text-base">Transfer type: {transfer.transferType}</p>
        <p className="text-base">
          Price: {transfer.price.totalAmount} {transfer.price.currencyId}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Confir tranfer
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          More info
        </button>
      </div>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        transfer={transfer}
      />
    </div>
  );
}

export default TranfersCards;
