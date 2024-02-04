"use client";
import React, { useEffect, useState } from "react";

export default function deshboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/deshboard");
    const response = await res.json();

    if (response) {
      setUsers(response.users);
    } else {
      console.error(`unable to fetch data`);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((users) => (
          <li key={users._id}>
            Name: {users.name}, Email: {users.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
