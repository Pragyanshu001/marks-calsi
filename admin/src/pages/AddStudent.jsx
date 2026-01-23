import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/Authcontext";

const AddStudent = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [halfYearly, setHalfYearly] = useState("");
  const [quarterly, setQuarterly] = useState("");
  const [final, setFinal] = useState("");
  const [studentClass, setStudentClass] = useState("");

  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${serverUrl}/api/v1/user/addStudent`,
        {
          email: studentEmail,
          name: studentName,
          halfYearly: halfYearly,
          quarterly: quarterly,
          final: final,
          studentClass: studentClass,
        },
        { withCredentials: true },
      );
      //   console.log("OTP verification flow");
      navigate("/home");
      return;
    } catch (error) {
      if (error.response.data.message === "Email not Found") {
        alert("Account not found");
      }
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-white font-sans">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <div className="h-10 w-10 rounded-full" /> {/* Logo */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="/" className="cursor-pointer text-black font-bold">
              Home
            </a>
            <a className="cursor-pointer hover:text-black">Web designs</a>
            <a className="cursor-pointer hover:text-black">Mobile designs</a>
            <a className="cursor-pointer hover:text-black">Illustrations</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
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

          <button
            // onClick={handleLogout}
            className="cursor-pointer px-5 py-2  bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-black"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className=" inset-0 flex-1 bg-linear-to-br  from-[#FDB07F] via-[#649AAE] to-[#B79FD2] flex items-center justify-center p-4">
        {/* Modal Card */}
        <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[40px] shadow-2xl overflow-hidden p-10 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Add New Student
            </h2>
            <p className="text-gray-500 mt-2">
              Enter student details to update the report table.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Student Name
              </label>
              <input
                onChange={(e) => {
                  setStudentName(e.target.value);
                }}
                type="text"
                value={studentName}
                placeholder="e.g. John Doe"
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>
            {/* Student Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Student email
              </label>
              <input
                onChange={(e) => {
                  setStudentEmail(e.target.value);
                }}
                type="text"
                value={studentEmail}
                placeholder="e.g. johndoe@gmail.com"
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Class selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Class
              </label>
              <select
                onChange={(e) => {
                  setStudentClass(e.target.value);
                }}
                value={studentClass}
                className="w-full px-5 py-3.5 rounded-2xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all appearance-none"
              >
                <option>Select a class</option>
                <option>Class 10th</option>
                <option>Class 11th</option>
                <option>Class 12th</option>
              </select>
            </div>

            {/* Exam Scores Row */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Half Yearly
                </label>
                <input
                  value={halfYearly}
                  onChange={(e) => {
                    setHalfYearly(e.target.value);
                  }}
                  type="number"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Quarterly
                </label>
                <input
                  value={quarterly}
                  onChange={(e) => {
                    setQuarterly(e.target.value);
                  }}
                  type="number"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">
                  Final
                </label>
                <input
                  value={final}
                  onChange={(e) => {
                    setFinal(e.target.value);
                  }}
                  type="number"
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-10">
              <Link to={"/home"}>
                <button
                  type="button"
                  className="flex-1 py-4 px-5 border border-gray-300 cursor-pointer bg-gray-400 rounded-full font-bold text-gray-600 hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={handleAddStudent}
                type="submit"
                className="flex-1 py-4 bg-gray-800 cursor-pointer text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg active:scale-95"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
