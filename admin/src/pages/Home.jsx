import React from "react";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { authDataContext } from "../context/Authcontext";

const Home = () => {
  const [showSave, setShowSave] = useState(false);
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const token = sessionStorage.getItem("token");
  let { serverUrl } = useContext(authDataContext);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user/student/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data.data.students);
      setMarks(res.data.data.marks);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };
  const calculateTotal = (student) => {
    const totalMarks =
      student.halfYearly * 0.1 + student.quarterly * 0.3 + student.final * 0.7;
    return totalMarks;
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${serverUrl}/api/v1/user/update-marks`,
        {
          marks: marks, // pura updated marks array
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setShowSave(false);
      alert("Marks saved successfully");
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save marks ");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchStudents();
  }, []);

  //   console.log(marks, "orignal");

  const changeMarks = async (index, field, value) => {
    let newMarks = [...marks];
    newMarks[index][field] = Number(value);
    setMarks(newMarks);
  };

  const handleLogout = () => {
    // Remove token
    sessionStorage.removeItem("token");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-white font-sans">
      <nav className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <div className="h-10 w-10 rounded-full" /> {/* Logo */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="text-black font-bold">
              Home
            </a>
            <a href="#" className="hover:text-black">
              Web designs
            </a>
            <a href="#" className="hover:text-black">
              Mobile designs
            </a>
            <a href="#" className="hover:text-black">
              Illustrations
            </a>
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

          {/* <Link to={"/sign-up"}> */}
          <button
            onClick={handleLogout}
            className="cursor-pointer px-5 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-black"
          >
            Log out
          </button>
          {/* </Link> */}
        </div>
      </nav>
      <div className="h-screen w-full bg-linear-to-br from-[#FDB07F] via-[#649AAE] to-[#B79FD2] relative overflow-hidden font-sans">
        {/* Blurred background spheres to mimic the image aesthetic */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative max-w-5xl mx-auto p-8">
          {/* Top Action Buttons */}
          <div className="flex justify-end gap-4 mb-6">
            <Link to={"/add-student"}>
              <button className="flex items-center gap-2 bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-colors shadow-md">
                <IoPersonAddSharp />
                Add Student
              </button>
            </Link>
            {/* <button className="flex items-center gap-2 bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-colors shadow-md">
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generate Report
            </button> */}
          </div>

          {/* Glassmorphism Table Card */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-white/20">
              <h2 className="text-xl font-semibold text-gray-800">
                Student Report Data
              </h2>
              {showSave ? (
                <button
                  onClick={() => {
                    setShowSave(false);
                    handleSave();
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-400 rounded-lg transition-colors"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowSave(true);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-400 rounded-lg transition-colors"
                >
                  <FaEdit />
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-600 uppercase text-xs font-semibold tracking-wider border-b border-white/20">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4 text-center">Half Yearly</th>
                    <th className="px-6 py-4 text-center">Quarterly</th>
                    <th className="px-6 py-4 text-center">Final Exam</th>
                    <th className="px-6 py-4 text-center font-bold text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {students.map((student) => {
                    const studentIndex = marks.findIndex(
                      (mark) => mark.userId === student.userId,
                    );

                    return (
                      <tr
                        key={student.userId}
                        className="hover:bg-white/10 transition-colors even:bg-gray-50/20"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {marks[studentIndex].studentClass}
                        </td>
                        <td
                          className={`px-6 py-4 text-sm text-center ${
                            !showSave ? "text-gray-600" : "text-black"
                          }`}
                        >
                          <input
                            className={` text-center ${
                              !showSave ? "" : "border-dashed border"
                            }`}
                            // type="text"
                            // inputMode="numeric"
                            // pattern="[0-9]*"
                            type="number"
                            maxLength={3}
                            min={0}
                            max={100}
                            disabled={!showSave}
                            value={marks[studentIndex].halfYearly}
                            onChange={(e) =>
                              changeMarks(
                                studentIndex,
                                "halfYearly",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td
                          className={`px-6 py-4 text-sm text-center ${
                            !showSave ? "text-gray-600" : "text-black"
                          }`}
                        >
                          <input
                            className={` text-center ${
                              !showSave ? "" : "border-dashed border"
                            }`}
                            type="number"
                            disabled={!showSave}
                            value={marks[studentIndex].quarterly}
                            onChange={(e) =>
                              changeMarks(
                                studentIndex,
                                "quarterly",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td
                          className={`px-6 py-4 text-sm text-center ${
                            !showSave ? "text-gray-600" : "text-black"
                          }`}
                        >
                          <input
                            className={` text-center ${
                              !showSave ? "" : "border-dashed border"
                            }`}
                            type="number"
                            disabled={!showSave}
                            defaultValue={marks[studentIndex].final}
                            onChange={(e) =>
                              changeMarks(studentIndex, "final", e.target.value)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 text-sm text-center font-bold text-blue-600">
                          {calculateTotal(marks[studentIndex])}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
