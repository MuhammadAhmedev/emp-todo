"use client";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href={"/"}
          className="font-mono text-3xl text-primary font-extrabold"
        >
          Emp
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-lg justify-center">
          {status == "authenticated" && (
            <Link
              href={"/youremployees"}
              className="mr-5 text-lg font-semibold mt-2  hover:text-primary"
            >
              Your Employees
            </Link>
          )}
        </nav>
        {status == "authenticated" ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none h rounded text-base mt-4 md:mt-0 text-white"
          >
            Logout
          </button>
        ) : (
          <Link
            href={"/login"}
            className="inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none h rounded text-base mt-4 md:mt-0 text-white"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
