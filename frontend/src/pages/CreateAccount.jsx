import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAccount = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: "",
        birthdate: "",
        gender: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        try {
            await API.post("/users/register", formData);

            toast.success("Account created successfully! Redirecting...", {
                position: "top-right",
                autoClose: 2000,
            });

            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Registration failed", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                toast.error("An unexpected error occurred", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200 relative overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
                <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full blur-3xl top-12 left-16 animate-pulse"></div>
                <div className="absolute w-72 h-72 bg-amber-400 opacity-30 rounded-full blur-3xl bottom-12 right-16 animate-pulse"></div>
            </div>

            {/* Form Card */}
            <form
                onSubmit={handleCreateAccount}
                className="backdrop-blur-lg bg-white/60 shadow-2xl border border-white/40 rounded-3xl p-8 w-full max-w-md transition-transform transform hover:scale-[1.02]"
            >
                <h1 className="text-4xl font-extrabold text-center text-amber-700 mb-6 tracking-tight drop-shadow-sm">
                    Create Account
                </h1>
                <p className="text-center text-gray-600 mb-8 text-sm">
                    Fill out your details to get started
                </p>

                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Name
                    </label>
                    <input
                        name="name"
                        onChange={handleChange}
                        type="text"
                        required
                        placeholder="Enter your full name"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        name="email"
                        onChange={handleChange}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        name="password"
                        onChange={handleChange}
                        type="password"
                        required
                        placeholder="Create a password"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Age */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Age
                    </label>
                    <input
                        name="age"
                        onChange={handleChange}
                        type="number"
                        required
                        placeholder="Enter your age"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Birthdate */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Birthdate
                    </label>
                    <input
                        name="birthdate"
                        onChange={handleChange}
                        type="date"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                    />
                </div>

                {/* Gender */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Gender
                    </label>
                    <select
                        name="gender"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Buttons */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-amber-700 hover:to-orange-600 transition duration-300"
                >
                    Create Account
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-amber-600 hover:underline cursor-pointer font-medium"
                    >
                        Log in
                    </span>
                </p>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default CreateAccount;
