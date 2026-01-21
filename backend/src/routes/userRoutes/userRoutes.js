const express = require("express");
const userController = require("../../controller/userController/user.controller");
const validate = require("../../middleware/validate");
const adminValidation = require("../../validations/admin.validation");
const { verifyToken } = require("../../middleware/verifyToken");
const { auth } = require("../../middleware/auth");

const userRoutes = express.Router();

userRoutes.post(
  "/create-principal",
  validate(adminValidation.createPrincipal),
  userController.createPrincipal
);
userRoutes.post(
  "/principal/login",
  validate(adminValidation.principalLogin),
  userController.principalLogin
);
userRoutes.post(
  "/principal/create-teacher",
  verifyToken,
  userController.createTeacher
);
userRoutes.post(
  "/teacher-loginWithPassword",
  validate(adminValidation.teacherLoginWithPassword),
  userController.teacherLoginWithPassword
);
userRoutes.post(
  "/student-loginWithPassword",
  validate(adminValidation.teacherLoginWithPassword),
  userController.teacherLoginWithPassword
);
userRoutes.post(
  "/teacher-login-with-otp",
  validate(adminValidation.teacherLoginWithOtp),
  userController.teacherLoginWithOTP
);
userRoutes.post(
  "/student-login-with-otp",
  validate(adminValidation.studentLoginWithOtp),
  userController.studentLoginWithOtp
);
userRoutes.get("/student/list", auth, userController.getAllStudents);
userRoutes.get("/student", verifyToken, userController.getStudent);

userRoutes.put("/update-marks", verifyToken, userController.updateMarks);

userRoutes.post(
  "/teacher-check-email",
  validate(adminValidation.teacherCheckEmail),
  userController.teacherCheckEmail
);
userRoutes.post(
  "/student-check-email",
  validate(adminValidation.teacherCheckEmail),
  userController.studentCheckEmail
);
userRoutes.post(
  "/addStudent",
  validate(adminValidation.addStudent),
  userController.addStudent
);

module.exports = userRoutes;
