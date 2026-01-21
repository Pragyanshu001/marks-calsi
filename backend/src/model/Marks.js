const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  halfYearly: {
    type: Number,
    required: true,
  },
  quarterly: {
    type: Number,
    required: true,
  },
  final: {
    type: Number,
    required: true,
  },

  studentClass: {
    type: String,
    required: true,
  },
});

const Marks = mongoose.model("Marks", marksSchema);
module.exports = Marks;
