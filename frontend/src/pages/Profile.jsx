import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import API from "../api/axios";
import { ToastContainer, toast } from "react-toastify"; // ✅ Optional (for notification)
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const fetchUser = async () => {
      const id = localStorage.getItem("userId");
      if (!id) return console.error("No userId found in localStorage");

      try {
        const res = await API.get(`/users/${id}`);
        setUserInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.clear(); // remove token + userId
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/"), 1000); // redirect after a short delay
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
        <div className="space-y-2 text-gray-700">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Age:</strong> {userInfo.age}</p>
          <p><strong>Birthdate:</strong> {userInfo.birthdate}</p>
          <p><strong>Gender:</strong> {userInfo.gender}</p>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Profile;
