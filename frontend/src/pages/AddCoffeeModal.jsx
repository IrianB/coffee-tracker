import React, { useState } from "react";
import API from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoffeeModal = ({ isOpen, onClose, onCoffeeAdded }) => {
    const [coffeeShopName, setCoffeeShopName] = useState("");
    const [coffeeName, setCoffeeName] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");

    const coffeeSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!coffeeShopName || !coffeeName || !size || !price) {
                toast.error("All fields are required!");
                return;
            }

            const response = await API.get('/coffee/get-coffee')

            const existingCoffee = response.data.some(item =>
                item.coffeeName.trim().toLowerCase() === coffeeName.trim().toLowerCase() &&
                item.coffeeShopName.trim().toLowerCase() === coffeeShopName.trim().toLowerCase() &&
                item.size === size &&
                item.price === Number(price)
            )

            if (existingCoffee) {
                toast.error("Info already existed")
                return
            }

            const res = await API.post(
                "/coffee/add-coffee",
                {
                    coffeeShopName,
                    coffeeName,
                    size,
                    price: Number(price),
                }
            );
            onCoffeeAdded(res.data)
            onClose();

            toast.success("Coffee added successfully!");
            setCoffeeShopName("");
            setCoffeeName("");
            setSize("");
            setPrice("");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add coffee");
        }
    };



    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
                >
                    &times;
                </button>

                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Add Coffee Entry
                </h1>

                <form onSubmit={coffeeSubmit} className="space-y-4">
                    <input
                        value={coffeeShopName}
                        onChange={(e) => setCoffeeShopName(e.target.value)}
                        type="text"
                        placeholder="Coffee Shop Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                    />
                    <input
                        value={coffeeName}
                        onChange={(e) => setCoffeeName(e.target.value)}
                        type="text"
                        placeholder="Coffee Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                    />
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                        required
                    >
                        <option value="" disabled>
                            Select Size
                        </option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Price"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
                    >
                        Add Coffee
                    </button>
                </form>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default AddCoffeeModal;
