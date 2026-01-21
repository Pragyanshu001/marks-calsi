import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-[#FDB07F] via-[#649AAE] to-[#B79FD2] p-4 font-sans">
      {/* Navigation Bar */}
      <nav className="absolute top-0 w-full backdrop-blur-3xl bg-white/20 flex items-center justify-between px-8 py-6">
        <div className="h-10 w-10 rounded-full" /> {/* Logo Placeholder */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </div>
          <Link to={"/login"}>
            <button className="cursor-pointer px-5 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-black">
              Log in
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Container */}
      <main className="relative w-full max-w-6xl flex items-center">
        {/* Abstract Background Elements (Circles) */}
        <div className="absolute right-0 -z-10 w-2/3 h-[600px] flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Large layered ovals to mimic the background art */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[700px] bg-orange-200/40 rounded-full rotate-12 blur-2xl" />
            <div className="absolute right-20 top-1/2 -translate-y-1/2 w-[450px] h-[600px] bg-blue-200/40 rounded-full -rotate-12 blur-xl" />
          </div>
        </div>

        {/* Glassmorphic Card */}
        <div className="w-full max-w-lg p-16 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Upload results easily...
            <br />
            Get instantly...
          </h1>

          <p className="mt-6 text-gray-700 leading-relaxed text-lg">
            A simple and secure platform where teachers can upload student marks
            and results, and students can view their percentage, grades, and
            performance reports online.
          </p>

          <div className="mt-10 flex gap-4">
            <Link to={"/login"}>
              <button className="px-10 py-4 bg-[#1a1a1a] text-white rounded-full font-bold hover:bg-black transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
