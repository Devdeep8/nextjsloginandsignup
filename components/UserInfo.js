import React from "react";

const UserInfo = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-40 my-2">
      {/* User Info */}
      <div className="mb-2">
        <p className="text-gray-600">
          <strong>devdeep</strong>
        </p>
        <p className="text-gray-600">
          <strong>patidar</strong>
        </p>
      </div>

      {/* Logout Button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
