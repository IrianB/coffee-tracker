import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/users/login", { email, password });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("userId", user._id || user.id);

            toast.success("Login successful! Redirecting...");
            setTimeout(() => navigate("/layout"), 1000);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Login failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    const createAccount = () => {
        navigate("/create-account");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute w-72 h-72 bg-amber-400 opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
                <div className="absolute w-72 h-72 bg-orange-300 opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
            </div>

            <form
                onSubmit={onSubmitHandler}
                className="backdrop-blur-lg bg-white/60 shadow-2xl border border-white/40 rounded-3xl p-8 w-full max-w-sm transition-transform transform hover:scale-[1.02]"
            >
                <h1 className="text-4xl font-extrabold text-center text-amber-700 mb-6 tracking-tight drop-shadow-sm">
                    Welcome Back
                </h1>
                <p className="text-center text-gray-600 mb-8 text-sm">
                    Please log in to access your dashboard
                </p>

                {/* Email Input */}
                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Password Input */}
                <div className="mb-8">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-gray-400 transition"
                    />
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-amber-700 hover:to-orange-600 transition duration-300"
                >
                    Login
                </button>

                {/* Create Account Button */}
                <button
                    type="button"
                    onClick={createAccount}
                    className="w-full mt-4 border-2 border-amber-600 text-amber-700 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition duration-300"
                >
                    Create Account
                </button>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Home;
