const Joi = require("joi");

const createPrincipal = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .uppercase()
      .min(0)
      .message(
        "name should be less than 30 characters and no special characters"
      ),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};

const teacherCheckEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};
const teacherLoginWithOtp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    otp: Joi.number().required(),
  }),
};
const studentLoginWithOtp = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    otp: Joi.number().required(),
  }),
};

const principalLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};
const teacherLoginWithPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};
const addStudent = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    studentClass: Joi.string().required(),
    final: Joi.number().required(),
    halfYearly: Joi.number().required(),
    quarterly: Joi.number().required(),
  }),
};
module.exports = {
  createPrincipal,
  addStudent,
  teacherLoginWithPassword,
  teacherCheckEmail,
  principalLogin,
  studentLoginWithOtp,
  teacherLoginWithOtp,
};
