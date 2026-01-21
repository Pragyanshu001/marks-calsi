const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  UserId: {
    type: String,
    unique: true,
    required: true,
  },
  Otp: {
    type: Number,
    unique: true,
    required: true,
  },
  OtpExpire: {
    type: Date,
    required: true,
  },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
