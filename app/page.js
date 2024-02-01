'use client'
import Login from "@/components/login";
import Image from "next/image";
import { AuthProvider } from "./Providers";

export default function Home() {
  return (
    <>
    <Login/>
    <AuthProvider></AuthProvider></>
  );
}
