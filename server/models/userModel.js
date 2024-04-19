//? types import

const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },

    role: {
      type: String,
      enum: ["admin", "teacher", "staff", "student", "parent", "librarian", "accountant", "registrar", "examination officer", "driver", "canteen staff", "hosteler"],
    },
    image: {
      type: String,
    },
    education: {
      type: String,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [50, "Name can not be more than 50 characters"],
      minlength: [3, "Name must be at least 3 characters"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    gender: {
      type: String,
      default: "male",
      enum: ["male", "female", "other"],
    },
    phoneNumber: {
      type: String,
    },
    emergencyNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    route: {
      type: String,
    },

    isUseTransportation: {
      type: String,
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    canteenDepositedAmount: {
      type: String,
      default: 0,
    },

    // TODO:  Student role extra fields starts here ->
    studentBatch: {
      type: String,
    },

    studentAdmittedYear: {
      type: String,
    },

    studentSection: {
      type: String,
    },

    dateOfBirth: {
      type: String,
    },
    studentEnrollmentDate: {
      type: String,
      default: Date.now,
    },
    currentClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SchoolClass",
    },

    currentRollNo: {
      type: String,
    },
    //! NEW NEED TO BE ADDED IN CONTROLLER AND ALL

    // student achievement model it will be set using addForm model in manage student
    achievement_log: [
      {
        achievementName: {
          type: String,
        },
        achievementDate: {
          type: String,
        },
        achievementDescription: {
          type: String,
        },
        grade: {
          type: String,
        },
        section: {
          type: String,
        },
      },
    ],

    // student previous class roll and log record it will be set automatically when student is promoted to next class
    roll_grade_class_log: [
      {
        roll: {
          type: String,
        },
        grade: {
          type: String,
        },
        class: {
          type: String,
        },
        date: {
          type: String,
        },
      },
    ],

    // student marks model it will be set using addForm model in manage student
    //  will also be set from "manage examination" menu
    marks_log: [
      {
        subject: {
          type: String,
        },
        marks: {
          type: Number,
        },
        grade: {
          type: String,
        },
        section: {
          type: String,
        },
        term: {
          type: String,
        },
        admitted_year: {
          type: String,
        },
      },
    ],

    enrolledClassDate: {
      type: String,
    },

    studentPreviousSchoolName: {
      type: String,
    },
    studentPreviousSchoolAddress: {
      type: String,
    },
    studentPassedYear: {
      type: String,
    },
    studentGPA: {
      type: String,
    },
    studentContact: {
      type: String,
    },
    studentCurrentAddress: {
      type: String,
    },
    studentGuardian: [
      {
        guardianName: {
          type: String,
        },
        guardianContact: {
          type: String,
        },
        guardianAddress: {
          type: String,
        },
        guardianOccupation: {
          type: String,
        },
        guardianPaymentAmount: {
          type: String,
        },
        guardianPaymentMethod: {
          type: String,
        },
        isLocalGuardian: {
          type: Boolean,
        },
        guardianYearlyIncome: {
          type: String,
        },
        guardianRelation: {
          type: String,
        },
      },
    ],

    // TODO: Driver role extra fields starts here ->

    vehicleNumber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },
    licenseNumber: {
      type: String,
    },
    driverType: {
      type: String,
      enum: ["own employee", "contract base"],
    },

    // TODO: Staff role extra fields starts here ->
    staffFatherName: { type: String },
    staffMotherName: { type: String },
    designation: { type: String },
    department: { type: String },
    maritalStatus: { type: String, enum: ["single", "married", "divorced"] },
    workShift: { type: String },
    workLocation: { type: String },
    basicSalary: { type: Number },
    medicalLeavePerMonth: { type: Number },
    casualLeavePerMonth: { type: Number },
    maternityLeavePerMonth: { type: Number },
    staffPanNumber: { type: String },
    epfNumber: { type: String },
    bankName: { type: String },
    bankBranchName: { type: String },
    accountTitle: { type: String },
    accountNumber: { type: String },
    fbUrl: { type: String },
    twitterUrl: { type: String },
    linkedInUrl: { type: String },
    instaUrl: { type: String },
    resume: { type: String }, // Assuming you'll store the resume file path or URL
    joiningLetter: { type: String }, // Assuming you'll store the joining letter file path or URL
    resignationLetter: { type: String }, // Assuming you'll store the resignation letter file path or URL
    otherDocument: { type: String }, // Assuming you'll store the other document file path or URL
    staffDateOfBirth: {
      type: Date,
    },
    staffNoOfExperience: {
      type: String,
    },
    staffJoiningDate: {
      type: Date,
    },
    staffContractType: {
      type: String,
      enum: ["permanent", "temporary", "contractual"],
    },
    // TODO: Staff role extra fields ends here ->

    hashed_password: {
      type: String,
      trim: true,
      maxlength: [50, "password cant be more than 50 characters"],
      minlength: [3, "password must be at least 3 characters"],
    },

    salt: String,

    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual field:-
// T - type
// T - trim
// R - required
// L - lowercase
// U - unique
// MAX - maxlength
// MIN - minlength
// ENUM  - enum
// DEFAUlt - default (if you type default then required is not necessary)

//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
userSchema
  .virtual("password") // this virtual method is going to take the "password"
  .set(function (password) {
    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in userSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in userSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

userSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
  encryptPassword: function (password) {
    // if not password then our encrypt method will return empty string
    if (!password) {
      return "";
    }
    // this is going to return the hashed password
    try {
      //@ts-ignore
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
    } catch (err) {
      // if error occurs while hashing password, it will return empty string
      return "";
    }
  },

  compareWithEncryptedPassword: function (planeTextPassword) {
    return this.encryptPassword(planeTextPassword) === this.hashed_password; //? Will return true or false
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
