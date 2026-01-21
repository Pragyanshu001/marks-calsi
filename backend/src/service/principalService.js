const User = require("../model/User");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { genToken } = require("../config/genToken");
const OTP = require("../model/Otp");

const createPrincipal = async (principalData) => {
  try {
    const { name, email, password } = principalData;

    const checkEmail = await User.findOne({ email: email, role: "Principal" });
    if (checkEmail) {
      throw new ApiError(
        httpStatus.status.BAD_REQUEST,
        email + " is already taken. Please try with different Email"
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "Principal",
    });
    return { name: result.name, email: result.email };
  } catch (error) {
    console.error("fail to create principal", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};
const createTeacher = async (principalData) => {
  try {
    const { name, email } = principalData;

    const teacher = await User.findOne({ email: email, role: "Teacher" });
    if (teacher) {
      throw new ApiError(
        httpStatus.status.BAD_REQUEST,
        email +
          " is already given to a teacher, Please try with different Email"
      );
    }

    const newTeacher = await User.create({
      name,
      email,
      role: "Teacher",
    });
    const token = await genToken(
      newTeacher.userId,
      "Teacher",
      newTeacher.email
    );

    return {
      newTeacher,
      token,
    };
  } catch (error) {
    console.error("fail to create Teacher", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

const principalLogin = async (principalData) => {
  try {
    const { email, password } = principalData;

    const principal = await User.findOne({ email: email, role: "Principal" });
    if (!principal) {
      throw new ApiError(
        httpStatus.status.UNAUTHORIZED,
        "Login Failed! Incorrect email or password"
      );
    }
    const isMatch = await bcrypt.compare(password, principal.password);
    if (!isMatch) {
      throw new ApiError(
        httpStatus.status.UNAUTHORIZED,
        "Login Failed! Incorrect email or password"
      );
    }

    const token = await genToken(
      principal.userId,
      "Principal",
      principal.email
    );

    return {
      principal,
      token,
    };
  } catch (error) {
    console.error("fail to Login Principal", error.message);
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  createPrincipal,
  createTeacher,
  principalLogin,
};
