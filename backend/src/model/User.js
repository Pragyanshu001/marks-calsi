const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 8,
      validate(value) {
        if (!value) return;
        if (
          !value.match(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
          )
        ) {
          throw new Error(
            "password must contain At least one lower case and At least one upper case English letter and 1 number"
          );
        }
      },
    },
    role: {
      type: String,
      enum: ["Principal", "Teacher", "Student"],
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isNew) {
    if (!this.userId) {
      this.userId = uuid();
    }
    this._md = {
      createdBy: this.userId,
      createdDtm: new Date(),
    };
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
