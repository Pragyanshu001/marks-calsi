const User = require("../model/User");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const OTP = require("../model/Otp");
const { genToken } = require("../config/genToken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
require("dotenv").config();

const teacherCheckEmail = async (teacherData) => {
  const { email } = teacherData;

  const teacher = await User.findOne({ email, role: "Teacher" });

  if (!teacher) {
    throw new ApiError(httpStatus.status.BAD_REQUEST, "Email not Found");
  }
  if (!teacher.password) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await OTP.deleteMany({ UserId: teacher.userId });

    // Save new OTP
    await OTP.create({
      UserId: teacher.userId,
      Otp: otp,
      OtpExpire: otpExpire,
    });

    // --- START BREVO EMAIL INTEGRATION ---
    try {
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "School Portal",
            email: "pragyanshugupta001@gmail.com",
          },
          to: [{ email: teacher.email, name: teacher.name }],
          subject: "Your Registration OTP",
          htmlContent: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd;">
              <h2>Welcome to the Portal</h2>
              <p>You need to set your password. Use the OTP below to verify your account:</p>
              <h1 style="color: #4A90E2; letter-spacing: 5px;">${otp}</h1>
              <p>This OTP is valid for 5 minutes.</p>
            </div>
          `,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );
    } catch (emailError) {
      console.error(
        "Brevo Email Error:",
        emailError.response?.data || emailError.message,
      );
      // Optional: Don't throw error here if you want the user to still see "OTP Sent"
      // but usually, we want to know if the email failed.
    }
    // --- END BREVO EMAIL INTEGRATION ---

    return { status: "PASSWORD_NOT_SET", message: "OTP sent to your email" };
  }

  return { status: "PASSWORD_EXISTS" };
};
const teacherLoginWithPassword = async (teacherData) => {
  try {
    const { email, password } = teacherData;

    // Find teacher
    const teacher = await User.findOne({ email, role: "Teacher" });
    if (!teacher) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Login Failed! Incorrect email or password",
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, teacher.password);
    // ye temporary ha
    // const isMatch = password == teacher.password;
    if (!isMatch) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "Login Failed! Incorrect email or password",
      );
    }
    const token = await genToken(teacher.userId, "Teacher", teacher.email);

    return {
      teacher,
      token,
    };
  } catch (error) {
    console.error("fail to Login Principal", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};
const teacherLoginWithOTP = async (teacherData) => {
  try {
    const { email, password, otp } = teacherData;

    if (!otp) {
      throw new ApiError(httpStatus.status.BAD_REQUEST, "Please enter OTP");
    }
    const otpRecord = await OTP.findOne({ Otp: otp });

    //  OTP match check
    if (!otpRecord) {
      throw new ApiError(httpStatus.status.BAD_REQUEST, "Invalid OTP");
    }

    //OTP expiry check
    if (otpRecord.OtpExpire < new Date()) {
      await OTP.deleteOne({ Otp: otp });
      throw new ApiError(httpStatus.status.BAD_REQUEST, "OTP expired");
    }

    const teacher = await User.findOne({ email: email });
    if (!teacher) {
      throw new ApiError(httpStatus.status.UNAUTHORIZED, "Invalid email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { userId: teacher.userId },
      { password: hashedPassword },
    );
    await OTP.deleteOne({ Otp: otp });

    const token = genToken(teacher.userId, teacher.role, teacher.email);

    return {
      teacher,
      token,
    };
  } catch (error) {
    console.error("fail to Login Teacher", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  teacherLoginWithPassword,
  teacherCheckEmail,
  teacherLoginWithOTP,
};
