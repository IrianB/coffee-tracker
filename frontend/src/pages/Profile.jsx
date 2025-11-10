import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  const updateProfile = async () => {
    if (canEdit) {
      const id = userInfo._id;
      if (!id) return console.error("No user ID found");

      try {
        await API.patch(`/users/update/${id}`, {
          name: userInfo.name,
          email: userInfo.email,
          age: userInfo.age,
          birthdate: userInfo.birthdate,
          gender: userInfo.gender,
        });
        toast.success("Profile updated successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update profile");
      }
    }
    setCanEdit(!canEdit);
  };

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

  const handleLogout = () => {
    localStorage.clear();
    toast.info("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="flex justify-center items-start p-8 bg-amber-50 min-h-screen">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 w-full max-w-lg transition-all duration-200 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-8">
          👤 Profile
        </h1>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            {canEdit ? (
              <input
                type="text"
                value={userInfo.name || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {userInfo.name || "—"}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            {canEdit ? (
              <input
                type="email"
                value={userInfo.email || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {userInfo.email || "—"}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Age</label>
            {canEdit ? (
              <input
                type="number"
                value={userInfo.age || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, age: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {userInfo.age || "—"}
              </p>
            )}
          </div>

          {/* Birthdate */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Birthdate
            </label>
            {canEdit ? (
              <input
                type="date"
                value={userInfo.birthdate || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, birthdate: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {userInfo.birthdate || "—"}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Gender
            </label>
            {canEdit ? (
              <select
                value={userInfo.gender || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, gender: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {userInfo.gender || "—"}
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={updateProfile}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md active:scale-95 transition duration-200"
          >
            {canEdit ? "💾 Save" : "✏️ Edit"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md active:scale-95 transition duration-200"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default Profile;
