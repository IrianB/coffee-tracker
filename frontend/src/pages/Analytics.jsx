import React, { useEffect, useState } from 'react'
import API from '../api/axios.js'

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null)

    const fetchAnalytics = async () => {
        try {
            const response = await API.get('/coffee/analytics')
            setAnalytics(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    if (!analytics) {
        return (
            <div className="flex justify-center items-center h-64 text-amber-700 font-semibold">
                Loading analytics...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 py-10 px-6">
            <h1 className="text-3xl font-bold text-amber-700 text-center mb-8">
                Coffee Analytics
            </h1>

            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Coffees */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Total Coffees Logged
                    </h2>
                    <p className="text-4xl font-bold text-amber-600">
                        {analytics.totalCoffees}
                    </p>
                </div>

                {/* Total Money Spent */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Total Money Spent
                    </h2>
                    <p className="text-4xl font-bold text-green-600">
                        ₱{analytics.totalSpent.toFixed(2)}
                    </p>
                </div>

                {/* Most Used Coffee */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Most Used Coffee
                    </h2>
                    <p className="text-2xl font-bold text-amber-700">
                        {analytics.mostUsedCoffee}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {analytics.mostUsedCoffeeCount} times
                    </p>
                </div>

                {/* Most Visited Shop */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Most Visited Coffee Shop
                    </h2>
                    <p className="text-2xl font-bold text-amber-700">
                        {analytics.mostVisitedShop}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {analytics.mostVisitedShopCount} visits
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Analytics
