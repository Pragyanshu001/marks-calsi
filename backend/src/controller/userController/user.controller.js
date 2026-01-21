const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");
const genToken = require("../../config/genToken.js");
const User = require("../../model/User.js");
const principalService = require("../../service/principalService.js");
const teacherService = require("../../service/teacherService.js");
const studentService = require("../../service/studentService.js");
const {
  successResponseGenerator,
  errorResponse,
} = require("../../utils/ApiHelpers.js");

const createTeacher = async (req, res) => {
  try {
    const teacher = await principalService.createTeacher(req.body);

    res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Teacher Created successfully",
          teacher
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};

const principalLogin = async (req, res) => {
  try {
    const principal = await principalService.principalLogin(req.body);
    res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Principal Login successfully",
          principal
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();

    res
      .status(httpStatus.status.OK)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Students fetched successfully",
          students
        )
      );
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.status.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const getStudent = async (req, res) => {
  try {
    // console.log(req, "dj");

    const student = await studentService.getStudent(req.id);

    res
      .status(httpStatus.status.OK)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Students fetched successfully",
          student
        )
      );
  } catch (error) {
    res
      .status(error.statusCode || httpStatus.status.INTERNAL_SERVER_ERROR)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const addStudent = async (req, res) => {
  try {
    const principal = await studentService.addStudent(req.body);
    res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.CREATED,
          "Student Created successfully",
          principal
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const createPrincipal = async (req, res) => {
  try {
    const principal = await principalService.createPrincipal(req.body);
    res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.CREATED,
          "Principal Created successfully",
          principal
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const studentLoginWithOtp = async (req, res) => {
  try {
    const teacher = await studentService.studentLoginWithOtp(req.body);
    res
      .status(httpStatus.status.OK)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Student login successfully",
          teacher
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const teacherLoginWithOTP = async (req, res) => {
  try {
    const teacher = await teacherService.teacherLoginWithOTP(req.body);
    res
      .status(httpStatus.status.OK)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Teacher login successfully",
          teacher
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};

const teacherCheckEmail = async (req, res) => {
  try {
    const teacher = await teacherService.teacherCheckEmail(req.body);

    return res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.CREATED,
          "User Found",
          teacher
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
};
const studentCheckEmail = async (req, res) => {
  try {
    const teacher = await studentService.studentCheckEmail(req.body);

    return res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.CREATED,
          "User Found",
          teacher
        )
      );
  } catch (error) {
    return res
      .status(error.statusCode)
      .send(errorResponse(error.statusCode, error.message));
  }
};

const teacherLoginWithPassword = async (req, res) => {
  try {
    const teacher = await teacherService.teacherLoginWithPassword(req.body);

    res
      .status(httpStatus.status.CREATED)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "Teacher Login successfully",
          teacher
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.status.BAD_REQUEST)
      .send(errorResponse(error.statusCode, error.message));
  }
};

const updateMarks = async (req, res) => {
  try {
    const { marks } = req.body;

    const result = await studentService.updateMarks(marks);

    res
      .status(httpStatus.status.OK)
      .send(
        successResponseGenerator(
          httpStatus.status.OK,
          "marks updated successfully",
          result
        )
      );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateMarks,
  getStudent,
  studentCheckEmail,
  createPrincipal,
  teacherLoginWithOTP,
  studentLoginWithOtp,
  teacherCheckEmail,
  principalLogin,
  teacherLoginWithPassword,
  createTeacher,
  addStudent,
  getAllStudents,
};
