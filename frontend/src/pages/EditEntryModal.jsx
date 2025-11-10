import React, { useEffect, useState } from "react";
import API from "../api/axios.js";

const EditEntryModal = ({ isOpen, onClose }) => {
    const [coffees, setCoffees] = useState([]);
    const [selectedCoffee, setSelectedCoffee] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const fetchCoffees = async () => {
            try {
                const response = await API.get("/coffee/get-coffee");
                setCoffees(response.data);
            } catch (error) {
                console.error("Error fetching coffees:", error);
            }
        };

        fetchCoffees();
    }, [isOpen]);

    const submitEntry = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/entry/create-entry", { coffeeId: selectedCoffee });
            setSelectedCoffee("");
            console.log("Entry created:", res.data);
            onClose();
        } catch (error) {
            console.error("Error creating entry:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Add Entry</h2>

                <div className="max-h-[40vh] overflow-y-auto pr-2">
                    <form onSubmit={submitEntry}>
                        <label htmlFor="coffee" className="block mb-2 font-medium">
                            Select Coffee:
                        </label>

                        <select
                            id="coffee"
                            value={selectedCoffee}
                            onChange={(e) => setSelectedCoffee(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">-- Choose a coffee --</option>
                            {coffees.map((coffee) => (
                                <option key={coffee._id} value={coffee._id}>
                                    {coffee.coffeeName}
                                </option>
                            ))}
                        </select>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Add Entry
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEntryModal;
