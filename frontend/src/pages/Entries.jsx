import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import EditEntryModal from "./EditEntryModal.jsx";

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEntries = async () => {
    try {
      const response = await API.get("/entry/entries");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [isOpen]);

  const deleteEntryCoffee = async (entry) => {
    try {
      await API.delete(`/entry/delete-entry/${entry._id}`);
      console.log("Entry deleted successfully");
      setEntries(entries.filter((coffee) => coffee._id !== entry._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <EditEntryModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          ☕ Today's Coffee Entries
        </h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-2 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 active:scale-95 transition duration-200 ease-in-out"
        >
          + Add Entry
        </button>
      </div>

      {/* Scrollable table container */}
      <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-[55vh] hide-scrollbar shadow-md bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-amber-600 text-white uppercase text-xs sticky top-0">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Coffee Name</th>
              <th className="py-3 px-4 text-left font-semibold">Price</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr
                  key={entry._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-amber-50"
                    } hover:bg-amber-100 transition duration-150`}
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {entry.coffeeId?.coffeeName || "Unknown"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    ₱ {entry.coffeeId?.price?.toFixed(2) || "0.00"}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {new Date(entry.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <button
                      onClick={() => deleteEntryCoffee(entry)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 active:scale-95 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No coffee entries yet ☕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Entries;
  