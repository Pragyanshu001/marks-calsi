import React, { useState } from "react";
import signupImg from "../assets/login-signup.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../context/Authcontext";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [teacherNewPassword, setTeacherNewPassword] = useState("");
  const [studentNewPassword, setStudentNewPassword] = useState("");

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [loading, setLoading] = useState(false);

  const [studentEmail, setStudentEmail] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [value, setValue] = React.useState("1");
  let { serverUrl } = useContext(authDataContext);
  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    //Remove token
    sessionStorage.removeItem("token");

    //Redirect to login
    navigate("/");
  };

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // STEP 1: ONLY EMAIL CHECK
      if (!showPasswordField && !showOtpField) {
        const res = await axios.post(
          `${serverUrl}/api/v1/user/teacher-check-email`,
          { email: teacherEmail },
          { withCredentials: true },
        );

        if (res.data.data.status === "PASSWORD_EXISTS") {
          setShowPasswordField(true);
        }

        if (res.data.data.status === "PASSWORD_NOT_SET") {
          setShowOtpField(true);
        }

        return;
      }

      // STEP 2: PASSWORD LOGIN
      if (showPasswordField) {
        const res = await axios.post(
          `${serverUrl}/api/v1/user/teacher-loginWithPassword`,
          { email: teacherEmail, password: teacherPassword },
          { withCredentials: true },
        );
        sessionStorage.setItem("token", res.data.data.token);
        navigate("/home");
        return;
      }

      // STEP 3: OTP + CREATE PASSWORD
      if (showOtpField) {
        // call OTP verify API
        const res = await axios.post(
          `${serverUrl}/api/v1/user/teacher-login-with-otp`,
          { email: teacherEmail, otp: otp, password: teacherNewPassword },
          { withCredentials: true },
        );

        sessionStorage.setItem("token", res.data.data.token);
        console.log("OTP verification flow");
        navigate("/home");
        return;
      }
    } catch (error) {
      if (error.response.data.message === "Email not Found") {
        alert("Account not found");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // STEP 1: ONLY EMAIL CHECK
      if (!showPasswordField && !showOtpField) {
        const res = await axios.post(
          `${serverUrl}/api/v1/user/student-check-email`,
          { email: studentEmail },
          { withCredentials: true },
        );

        if (res.data.data.status === "PASSWORD_EXISTS") {
          setShowPasswordField(true);
        }

        if (res.data.data.status === "PASSWORD_NOT_SET") {
          setShowOtpField(true);
        }

        return;
      }

      // STEP 2: PASSWORD LOGIN
      if (showPasswordField) {
        const res = await axios.post(
          `${serverUrl}/api/v1/user/student-loginWithPassword`,
          { email: studentEmail, password: studentPassword },
          { withCredentials: true },
        );
        sessionStorage.setItem("token", res.data.data.token);
        navigate("/home");
        return;
      }

      // STEP 3: OTP + CREATE PASSWORD
      if (showOtpField) {
        // call OTP verify API
        const res = await axios.post(
          ` ${serverUrl}/api/v1/user/student-login-with-otp`,
          { email: studentEmail, otp: otp, password: studentNewPassword },
          { withCredentials: true },
        );

        sessionStorage.setItem("token", res.data.data.token);
        console.log("OTP verification flow");
        navigate("/student-home");
        return;
      }
    } catch (error) {
      if (error.response.data.message === "Email not Found") {
        alert("Account not found");
      }
    } finally {
      setLoading(false);
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
          <button
            onClick={handleLogout}
            className="cursor-pointer px-5 py-2 bg-[#1a1a1a] text-white rounded-lg text-sm font-semibold hover:bg-black"
          >
            Log out
          </button>
        </div>
      </nav>

      <div className="flex flex-1 p-8 bg-linear-to-br from-[#FDB07F] via-[#649AAE] to-[#B79FD2]">
        {/* Left Side: Abstract Art Section */}
        <div className="hidden lg:flex w-1/2">
          <img
            src={signupImg}
            alt="login"
            className="h-[80vh] rounded-2xl m-auto"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full lg:w-1/2  flex flex-col justify-center items-center p-8 lg:p-0">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Teacher" value="1" />
                  <Tab label="Student" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="w-full max-w-md">
                  <h1 className="text-3xl font-bold text-gray-900">Log in</h1>
                  <p className="text-gray-700 mt-2 text-sm">
                    Log in for free to access to in any of our products
                  </p>

                  <form
                    action=""
                    onSubmit={handleTeacherLogin}
                    className="mt-8 space-y-6"
                  >
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Teacher's Email address
                      </label>
                      <input
                        onChange={(e) => {
                          setTeacherEmail(e.target.value);
                        }}
                        value={teacherEmail}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Password Field */}
                    {showPasswordField && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-700 flex items-center gap-1 hover:text-black"
                          >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => {
                            setTeacherPassword(e.target.value);
                          }}
                          value={teacherPassword}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <p className="text-[11px] text-gray-700 mt-2">
                          Use 8 or more characters with a mix of letters,
                          numbers & symbols
                        </p>
                      </div>
                    )}

                    {showOtpField && (
                      <>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Enter OTP
                          </label>
                        </div>
                        <input
                          type="number"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Create Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-700 flex items-center gap-1 hover:text-black"
                          >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => {
                            setTeacherNewPassword(e.target.value);
                          }}
                          value={teacherNewPassword}
                          placeholder="Password"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#1a1a1a] text-white rounded-full cursor-pointer font-bold text-lg hover:bg-[#000000] transition-colors"
                    >
                      Log in
                    </button>
                  </form>
                </div>
              </TabPanel>

              {/* for student */}
              <TabPanel value="2">
                {" "}
                <div className="w-full max-w-md">
                  <h1 className="text-3xl font-bold text-gray-900">Log in</h1>
                  <p className="text-gray-700 mt-2 text-sm">
                    Log in for free to access to in any of our products
                  </p>

                  <form
                    action=""
                    onSubmit={handleStudentLogin}
                    className="mt-8 space-y-6"
                  >
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Student's Email address
                      </label>
                      <input
                        onChange={(e) => {
                          setStudentEmail(e.target.value);
                        }}
                        value={studentEmail}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    {/* Password Field */}
                    {showPasswordField && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-700 flex items-center gap-1 hover:text-black"
                          >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <input
                          onChange={(e) => {
                            setStudentPassword(e.target.value);
                          }}
                          value={studentPassword}
                          type={showPassword ? "text" : "password"}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <p className="text-[11px] text-gray-700 mt-2">
                          Use 8 or more characters with a mix of letters,
                          numbers & symbols
                        </p>
                      </div>
                    )}

                    {showOtpField && (
                      <>
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Enter OTP
                          </label>
                        </div>
                        <input
                          type="number"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                        <div className="flex justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-800">
                            Create Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-sm text-gray-700 flex items-center gap-1 hover:text-black"
                          >
                            {showPassword ? <IoEyeOff /> : <IoEye />}
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => {
                            setStudentNewPassword(e.target.value);
                          }}
                          value={studentNewPassword}
                          placeholder="Password"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-colors
    ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-[#1a1a1a] hover:bg-black cursor-pointer"
    }
  `}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Processing...
                        </span>
                      ) : (
                        "Log in"
                      )}
                    </button>
                  </form>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
