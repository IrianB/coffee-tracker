import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate()

    const onSubmitHandler = (e)=> {
        e.preventDefault()
        navigate('/layout')
    }

    return (
        <div onSubmit={onSubmitHandler} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-200">
            <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
                    Welcome
                </h1>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Home;
