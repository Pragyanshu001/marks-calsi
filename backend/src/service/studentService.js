const Marks = require("../model/Marks");
const User = require("../model/User");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { genToken } = require("../config/genToken");
const OTP = require("../model/Otp");
const bcrypt = require("bcryptjs");
const axios = require("axios");
require("dotenv").config();

const getStudent = async (loggedInUser) => {
  try {
    const userId = loggedInUser;

    const mark = await Marks.findOne({ userId: userId });
    const student = await User.findOne({ userId: userId });
    console.log(mark);

    return { mark, student };
  } catch (error) {
    throw error;
  }
};
const getAllStudents = async (loggedInUser) => {
  try {
    const students = await User.find({ role: "Student" });

    const marks = await Marks.find({});

    return { students, marks };
  } catch (error) {
    throw error;
  }
};
const updateMarks = async (marksData) => {
  try {
    console.log(marksData);

    for (let m of marksData) {
      await Marks.findOneAndUpdate(
        { userId: m.userId },
        {
          halfYearly: m.halfYearly,
          quarterly: m.quarterly,
          final: m.final,
          total: m.total,
        },
        { new: true }
      );
    }

    return true;
  } catch (error) {
    console.error("Failed to update marks", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

const addStudent = async (studentData) => {
  try {
    const { email, name, halfYearly, quarterly, final, studentClass } =
      studentData;

    const checkEmail = await User.findOne({ email: email, role: "Student" });
    if (checkEmail) {
      throw new ApiError(
        httpStatus.status.BAD_REQUEST,
        email + " is already taken. Please try with different Email"
      );
    }

    const newStudent = await User.create({
      name,
      email,
      role: "Student",
    });
    await Marks.create({
      userId: newStudent.userId,
      halfYearly,
      quarterly,
      final,
      studentClass,
    });
    // const token = await genToken(
    //   newStudent.userId,
    //   "Student",
    //   newStudent.email
    // );

    return {
      newStudent,
      //   token,
    };
  } catch (error) {
    console.error("fail to create Student", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

const studentCheckEmail = async (studentData) => {
  const { email } = studentData;

  const student = await User.findOne({ email, role: "Student" });

  if (!student) {
    throw new ApiError(httpStatus.status.BAD_REQUEST, "Email not Found");
  }
  if (!student.password) {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await OTP.deleteMany({ UserId: student.userId });

    // Save new OTP
    await OTP.create({
      UserId: student.userId,
      Otp: otp,
      OtpExpire: otpExpire,
    });

    // --- START BREVO EMAIL INTEGRATION ---
    try {
      await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "School System",
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
        }
      );
    } catch (emailError) {
      console.error(
        "Brevo Email Error:",
        emailError.response?.data || emailError.message
      );
      // Optional: Don't throw error here if you want the user to still see "OTP Sent"
      // but usually, we want to know if the email failed.
    }
    // --- END BREVO EMAIL INTEGRATION ---

    return { status: "PASSWORD_NOT_SET" };
  }

  return { status: "PASSWORD_EXISTS" };
};
const studentLoginWithOtp = async (studentData) => {
  try {
    const { email, password, otp } = studentData;

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

    const student = await User.findOne({ email: email });
    if (!student) {
      throw new ApiError(httpStatus.status.UNAUTHORIZED, "Invalid email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { userId: student.userId },
      { password: hashedPassword }
    );
    await OTP.deleteOne({ Otp: otp });

    const token = genToken(student.userId, student.role, student.email);

    return {
      student,
      token,
    };
  } catch (error) {
    console.error("fail to Login Student", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  addStudent,
  getStudent,
  updateMarks,
  studentLoginWithOtp,
  getAllStudents,
  studentCheckEmail,
};
