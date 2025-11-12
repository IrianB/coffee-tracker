import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import AddCoffeeModal from "./AddCoffeeModal.jsx";
import EditCoffeeModal from "./EditCoffeeModal.jsx";

const Dashboard = () => {
  const [coffees, setCoffees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState();
  const [sorter, setSorter] = useState('default')

  const fetchCoffee = async () => {
    try {
      const response = await API.get("/coffee/get-coffee");
      setCoffees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCoffee = async (id) => {
    try {
      await API.delete(`/coffee/delete/${id}`);
      setCoffees(coffees.filter((coffee) => coffee._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sorter === "lowToHigh") {
      setCoffees((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sorter === "highToLow") {
      setCoffees((prev) => [...prev].sort((a, b) => b.price - a.price));
    } else if (sorter === "default") {
      fetchCoffee()
    }
  }, [sorter, isModalOpen, isEditModalOpen]);

  return (
    <div className="p-6">
      {/* Modals */}
      <AddCoffeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCoffeeAdded={(newCoffee) => setCoffees([newCoffee, ...coffees])}
      />
      <EditCoffeeModal
        coffee={selectedCoffee}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onCoffeeAdded={() => sorter}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          ☕ Coffee Dashboard
        </h1>

        <select
          name="sorter"
          id="sorter"
          value={sorter}
          onChange={(e) => setSorter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-400 transition duration-200 ease-in-out cursor-pointer"
        >
          <option value="default">🌀 Default Order</option>
          <option value="lowToHigh">💰 Price — Low to High</option>
          <option value="highToLow">💸 Price — High to Low</option>
        </select>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 bg-amber-600 text-white font-medium rounded-lg shadow-md hover:bg-amber-700 active:scale-95 transition duration-200 ease-in-out"
        >
          + Add Coffee
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="border border-gray-200 rounded-xl overflow-y-auto max-h-[60vh] hide-scrollbar shadow-md bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-amber-600 text-white uppercase text-xs sticky top-0">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Coffee Name</th>
              <th className="py-3 px-4 text-left font-semibold">Size</th>
              <th className="py-3 px-4 text-left font-semibold">Price</th>
              <th className="py-3 px-4 text-left font-semibold">Coffee Shop</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coffees.length > 0 ? (
              coffees.map((coffee, index) => (
                <tr
                  key={coffee._id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-amber-50"
                    } hover:bg-amber-100 transition duration-150`}
                >
                  <td className="py-3 px-4 border-b border-gray-200">
                    {coffee.coffeeName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {coffee.size}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    ₱ {coffee.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {coffee.coffeeShopName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center space-x-3">
                    <button
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setSelectedCoffee(coffee);
                      }}
                      className="px-3 py-1 text-sm bg-amber-500 text-white rounded-lg shadow-sm hover:bg-amber-600 active:scale-95 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCoffee(coffee._id)}
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
                  colSpan="5"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No coffee data available ☕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
