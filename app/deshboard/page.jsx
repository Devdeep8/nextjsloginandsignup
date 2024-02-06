"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTokenCookie, removeTokenCookie } from "@/utils/cookies";

export default function Dashboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData(); // Fetch data if user is logged in
  }, []); // Em

  const checkAuth = () => {
    const token = getTokenCookie(); // Assuming you store the token in localStorage
    if (!token) {
      // If token is not present, redirect to login page
      router.push("/");
    }
  };

  const fetchData = async () => {
    const res = await fetch("/api/deshboard");
    const response = await res.json();

    if (response) {
      setUsers(response.users);
    } else {
      console.error(`Unable to fetch data`);
    }
  };

  const handleLogout = () => {
    removeTokenCookie();
    router.push("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`bg-${darkMode ? "gray-800" : "white"} text-${
        darkMode ? "white" : "black"
      } transition-all duration-500  w-screen h-screen  overflow-hidden `}
    >
      <div
        className={`flex justify-end p-4 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={toggleDarkMode}
          className="text-gray-500 hover:text-gray-300 focus:outline-none"
        >
          {darkMode ? (
            <img src="/sun.svg" alt="Sun" className="w-6 h-6" />
          ) : (
            <img src="/moon.svg" alt="Moon" className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="">
        <h1
          className={`text-2xl font-bold mx-2 ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Users
        </h1>
        <div className="flex flex-wrap justify-center">
          {users.map((user, index) => (
            <div
              key={user._id}
              className={`p-4 my-4 rounded-lg shadow-md w-60 mx-2 ${
                darkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              {/* User Info */}
              <div className="mb-2">
                <p
                  className={`text-gray-600 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <strong>{user.name}</strong>
                </p>
                <p
                  className={`text-gray-600 ${
                    darkMode ? "text-white" : "text-black"
                  }`}
                >
                  <strong>{user.email}</strong>
                </p>
              </div>
              {/* Logout Button */}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                onClick={handleLogout}
              >
                Logout
              </button>
              {index > 0 && index % 4 === 0 && <br />}
            </div>
            // Add a conditional line break after every 5 cards
          ))}
        </div>
      </div>
    </div>
  );
}
