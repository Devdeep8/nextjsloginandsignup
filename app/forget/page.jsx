"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {  ToastContainer, toast } from "react-toastify";


export default function forget() {
    const router = useRouter();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");

  
    const handleChangepass = async(e) =>{
        e.preventDefault()
        const response = await fetch("/api/forget", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        console.log(response);
        if(response.ok){
          toast.success('Password change')
          setTimeout(() => {
            router.push('/')
          }, 2000);
        }else{
          toast.error('Password not change')
        }
    }
       
   
    return (
      <>
      <ToastContainer />
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
          <form className="mt-6" onSubmit={handleChangepass}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
                >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
           
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
                >
                Confirm Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
            </div>
           
            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Change Password
              </button>
            </div>
          </form>
  
          <div className="relative flex items-center justify-center w-full mt-6 border border-t">
            <div className="absolute px-5 bg-white">Or</div>
          </div>
  
          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
              >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      </>
    );
  }
  