const nodemailer = require("nodemailer");

//? Error Handlers
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const { addFile, deleteFile } = require("../utils/fileManipulation.js");

//? Validators
const { registerValidator } = require("../middlewares/validators/joiValidator");

//?Models
const HostelRoom = require("../models/hostelRoomModel");
const HostelStudent = require("../models/hostelStudentModel");
const User = require("../models/userModel");
const School = require("../models/schoolModel.js");
//? jwt
const { createGeneralJWT, verifyToken } = require("../utils/jwt");

//! REGISTER SCHOOL-USER
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { email } = req.body;
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
  });
  const schoolData = await School.findById({
    _id: req.headers["x-school-id"],
  }).exec();
  if (!schoolData) {
    return next(new ErrorHandler("School not found", 404));
  }
  let fileName = null;
  if (req.file) {
    console.log("File is present, proceeding with upload operations");
    fileName = `${Date.now()}.${req.file.originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], fileName, req.file.buffer)
      .then((filePath) => {
        console.log(`File ${fileName} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }
  let idNo;
  async function genId() {
    const fourDigitUniqueNumericId = Math.floor(1000 + Math.random() * 9000);
    idNo = fourDigitUniqueNumericId;
    const existingUser = await User.findOne({ idNo: idNo, school: School_Id }).exec();
    if (existingUser) {
      return genId();
    }
    return idNo;
  }
  const uniqueId = await genId();
  const newUser = new User(req.body);
  newUser.school = req.headers["x-school-id"];
  newUser.image = fileName;
  newUser.idNo = uniqueId;

  await newUser.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while saving user to db", 500));
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: success,
    });
  });
});

exports.registerStaff = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const {
    idNo,
    role,
    name,
    email,
    password,
    staffFatherName,
    staffMotherName,
    designation,
    department,
    maritalStatus,
    workShift,
    workLocation,
    basicSalary,
    medicalLeavePerMonth,
    casualLeavePerMonth,
    maternityLeavePerMonth,
    staffPanNumber,
    epfNumber,
    bankName,
    bankBranchName,
    accountTitle,
    accountNumber,
    fbUrl,
    twitterUrl,
    linkedInUrl,
    instaUrl,
    staffDateOfBirth,
    staffNoOfExperience,
    staffJoiningDate,
    staffContractType,
    education,
    phoneNumber,
    emergencyNumber,
    address,
    permanentAddress,
  } = req.body;

  console.log("log body = ", req.body);
  console.log("log files = ", req.files);
  let resume = null;
  let joiningLetter = null;
  let resignationLetter = null;
  let otherDocument = null;
  let image = null;
  if (req.files) {
    if (req.files.resume) {
      resume = req.files.resume[0].fieldname;
    }
    if (req.files.joiningLetter) {
      joiningLetter = req.files.joiningLetter[0].fieldname;
    }
    if (req.files.resignationLetter) {
      resignationLetter = req.files.resignationLetter[0].fieldname;
    }
    if (req.files.otherDocument) {
      otherDocument = req.files.otherDocument[0].fieldname;
    }
    if (req.files.image) {
      image = req.files.image[0].fieldname;
    }
  }
  let resumeFileName;
  let joiningLetterFileName;
  let resignationLetterFileName;
  let otherDocumentFileName;
  let imageFileName;

  if (image) {
    imageFileName = `${Date.now()}.${req.files.image[0].originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], imageFileName, req.files.image[0].buffer)
      .then((filePath) => {
        console.log(`File ${image} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }

  if (resume) {
    resumeFileName = `${Date.now()}.${req.files.resume[0].originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], resumeFileName, req.files.resume[0].buffer)
      .then((filePath) => {
        console.log(`File ${resume} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }
  if (joiningLetter) {
    joiningLetterFileName = `${Date.now()}.${req.files.joiningLetter[0].originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], joiningLetterFileName, req.files.joiningLetter[0].buffer)
      .then((filePath) => {
        console.log(`File ${joiningLetter} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }
  if (resignationLetter) {
    resignationLetterFileName = `${Date.now()}.${req.files.resignationLetter[0].originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], resignationLetterFileName, req.files.resignationLetter[0].buffer)
      .then((filePath) => {
        console.log(`File ${resignationLetter} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }
  if (otherDocument) {
    otherDocumentFileName = `${Date.now()}.${req.files.otherDocument[0].originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], otherDocumentFileName, req.files.otherDocument[0].buffer)
      .then((filePath) => {
        console.log(`File ${otherDocument} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }
  const newUser = new User({
    idNo,
    role,
    name,
    email,
    password,
    staffFatherName,
    staffMotherName,
    designation,
    department,
    maritalStatus,
    workShift,
    workLocation,
    basicSalary,
    medicalLeavePerMonth,
    casualLeavePerMonth,
    maternityLeavePerMonth,
    staffPanNumber,
    epfNumber,
    bankName,
    bankBranchName,
    accountTitle,
    accountNumber,
    fbUrl,
    twitterUrl,
    linkedInUrl,
    instaUrl,
    resume: resumeFileName,
    joiningLetter: joiningLetterFileName,
    resignationLetter: resignationLetterFileName,
    otherDocument: otherDocumentFileName,
    image: imageFileName,

    staffDateOfBirth,
    staffNoOfExperience,
    staffJoiningDate,
    staffContractType,
    education,
    phoneNumber,
    emergencyNumber,
    address,
    permanentAddress,
  });
  newUser.school = School_Id;
  await newUser.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while saving user to db", 500));
    }
    return res.status(201).json({
      success: true,
      message: "Teacher created successfully",
      data: success,
    });
  });
});

// delete teacher
exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  // x-school-unique-id
  const School_Folder_Name = req.headers["x-school-unique-id"];
  try {
    const existingUser = await User.findById({
      _id: userId,
    }).exec();

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete the associated image file, if it exists
    const fileName = existingUser.image;
    if (fileName) {
      await deleteFile(School_Folder_Name, fileName)
        .then(() => {
          console.log(`Deleted old file: ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });

      const resumeFileName = existingUser.resume;
      if (resumeFileName) {
        await deleteFile(School_Folder_Name, resumeFileName)
          .then(() => {
            console.log(`Deleted old file: ${resumeFileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      const joiningLetterFileName = existingUser.joiningLetter;
      if (joiningLetterFileName) {
        await deleteFile(School_Folder_Name, joiningLetterFileName)
          .then(() => {
            console.log(`Deleted old file: ${joiningLetterFileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      const resignationLetterFileName = existingUser.resignationLetter;
      if (resignationLetterFileName) {
        await deleteFile(School_Folder_Name, resignationLetterFileName)
          .then(() => {
            console.log(`Deleted old file: ${resignationLetterFileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      const otherDocumentFileName = existingUser.otherDocument;
      if (otherDocumentFileName) {
        await deleteFile(School_Folder_Name, otherDocumentFileName)
          .then(() => {
            console.log(`Deleted old file: ${otherDocumentFileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }
    }

    // Remove the school from the database
    await existingUser.remove();

    return res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

exports.getUserProfileData = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await User.findById(id)
    .select("-salt -hashed_password")
    .populate("school")
    .populate("vehicle")
    .exec((error, user) => {
      if (error) {
        return next(new ErrorHandler("server error", 500));
      }
      if (!user) {
        return next(new ErrorHandler("user not found", 400));
      }
      return res.status(200).json({
        success: true,
        message: "User profile data fetched successfully",
        data: user,
      });
    });
});

//! GET ALL SCHOOL USER OF PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllSchoolUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const users = await User.find({ school: School_Id }).select("-salt -hashed_password").populate("school").populate("vehicle").exec();
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL DRIVER USER with role "driver" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllDriverUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const users = await User.find({ school: School_Id, role: "driver" }).populate("school").populate("vehicleNumber").exec();
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL TEACHER USER with role "teacher" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllTeacherUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const users = await User.find({ school: School_Id, role: "teacher" }).populate("school").populate("vehicle").exec();
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Student USER with role "student" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllStudentUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const users = await User.find({ school: School_Id, role: "student" }).populate("school").populate("vehicle").populate("currentClass").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Canteen USER with role "canteen staff" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllCanteenUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const users = await User.find({ school: School_Id, role: "canteen staff" }).populate("school").populate("vehicle").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL Librarian USER with role "librarian" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllLibrarianUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const users = await User.find({ school: School_Id, role: "librarian" }).populate("school").populate("vehicle").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});
//! GET ALL hosteler USER with role "hosteler" from PARTICULAR SCHOOL WITH POPULATED SCHOOL DATA
exports.getAllHostelerUsersOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  const users = await User.find({ school: School_Id, role: "hosteler" }).populate("school").populate("vehicle").exec();

  // if not user then return empty array
  if (!users) {
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: [],
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

//! GET ALL SCHOOL-USER OF ALL SCHOOL  WITH POPULATED SCHOOL DATA
exports.getAllSchoolUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({}).select("-salt -hashed_password").populate("school").populate("vehicle").exec();

  if (!users) {
    return next(new ErrorHandler("No users found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

exports.verifiedRegisterUser = catchAsyncErrors(async (req, res, next) => {
  //*=============================================validate body data using
  //todo: JoiValidator , it will throw auto generated error as response
  const { name, email, password } = req.body;
  //specifically sending selected form data to joi, as joi will response as error if extra fields are provided in req.body
  const formDataForValidation = {
    email: email,
    name: name,
    password: password,
  };
  await registerValidator(formDataForValidation);

  //* ===================================================check if user already exist
  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  //*============================================================ If user dont exist,
  //todo: send verification email with dynamic frontend link with user-data-that-need-to-be-created inside jsonwebtoken
  //todo: in gmail use will receive == localhost:3000/verify-email-for-creating-account/{TokenHavingUserAccountDataToBeCreated}
  //localhost:3000/verify-email-for-creating-account/:id/:token
  //on clicking verify, the client fetch token from url
  //and send to server at server's endpoint /api/create-user-account-after-verifying-jwt/:id  inside header Bearer token to verify
  //the server will verity that token , then fetch user-account-data and create account with that data

  const generatedToken = await createGeneralJWT({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, "1d");

  const activationLink = `${process.env.PROD_CLIENT_URL}/activate-account/${generatedToken}`;

  var from = "donotreplythisback@gmail.com";
  var to = email;
  var subject = "Verification";
  var message = activationLink;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "donotreplythisback@gmail.com",
      pass: "sajjhjleycfzonhx",
    },
  });

  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return next(new ErrorHandler("Error occured while sending email", 500));
    } else {
      console.log("email sent :  " + info.response);
      return res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    }
  });

  // const emailSentStatus = await sendEmail(email, process.env.EMAIL_FROM, emailContent);
  // console.log(emailSentStatus);
  // if (emailSentStatus) {
  //   return res.status(200).json({
  //     success: true,
  //     message: "Verification email sent successfully",
  //   });
  // } else {
  //   return next(new ErrorHandler("Error occured while sending email", 500));
  // }
});

exports.createAccountForEmailVerifiedUser = catchAsyncErrors(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  console.log(req.header);
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1]; //? token is in form of Bearer token
    const tokenData = await verifyToken(token, process.env.JWT_ACCOUNT_ACTIVATION);
    console.log(tokenData);

    if (!tokenData) {
      return next(new ErrorHandler("No token provided", 401));
    }

    const { name, email, password } = tokenData.data;
    console.log(name);
    console.log(email);
    console.log(password);

    await User.findOne({ email }).exec((err, user) => {
      if (err) {
        return next(new ErrorHandler("Server Error, Try Again Later", 500));
      }
      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
    });

    const newUser = new User({ name, email, password });
    await newUser.save((err, success) => {
      if (err) {
        return next(new ErrorHandler("Error occured while saving user to db", 500));
      }
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: success,
      });
    });
  } else {
    return next(new ErrorHandler("No token provided", 401));
  }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  await User.findOne({ email }).exec(async (err, user) => {
    if (err) {
      return next(new ErrorHandler("server error", 400));
    }
    if (!user) {
      return next(new ErrorHandler("user not found", 400));
    }
    //? if model method returns false then execute below block
    if (!user.compareWithEncryptedPassword(password)) {
      return next(new ErrorHandler("password or email is incorrect", 400));
    }

    const { _id, name, email, role, school, image, currentClass } = user;
    console.log(user);

    // find schoolUniqueId from school model
    const schoolData = await School.findById({
      _id: school,
    }).exec();

    if (!schoolData) {
      return next(new ErrorHandler("School not found", 404));
    }

    const schoolUniqueId = schoolData.schoolUniqueId;

    const schoolName = schoolData.school_name;
    const schoolImage = schoolData.image;
    const schoolStreet = schoolData.street;

    const generatedToken = await createGeneralJWT({ schoolName, schoolImage, schoolStreet, userId: _id, name, email, role, schoolId: school, schoolUniqueId, image }, process.env.JWT_SECRET_KEY, "1d");

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        userId: _id,
        image,
        name,
        email,
        role,
        currentClass,
        schoolId: school,
        schoolUniqueId,
        schoolName,
        schoolImage,
        schoolStreet,
      },
      token: generatedToken,
    });
  });
});

//! DELETE SchoolUser CONTROLLER

exports.deleteSchoolUserController = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  const School_Folder_Name = req.headers["x-school-unique-id"];

  console.log(userId);

  try {
    const existingUser = await User.findById({
      _id: userId,
    }).exec();

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete the associated image file, if it exists
    const fileName = existingUser.image;
    if (fileName) {
      await deleteFile(School_Folder_Name, fileName)
        .then(() => {
          console.log(`Deleted old file: ${fileName}`);
        })
        .catch((error) => {
          console.error(`Error deleting old file: ${error}`);
        });
    }

    // Remove the school from the database
    await existingUser.remove();

    return res.status(200).json({
      success: true,
      message: "User has been deleted successfully!",
      data: {},
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

//! Update SchoolUser Controller

exports.updateSchoolUserController = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  const School_Folder_Name = req.headers["x-school-unique-id"];

  try {
    const existingUser = await User.findById(userId).exec();

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let fileName = existingUser.image;
    if (req.file) {
      if (fileName) {
        await deleteFile(School_Folder_Name, fileName)
          .then(() => {
            console.log(`Deleted old file: ${fileName}`);
          })
          .catch((error) => {
            console.error(`Error deleting old file: ${error}`);
          });
      }

      console.log("File is present, proceeding with upload operations");
      fileName = `${Date.now()}.png`;
      await addFile(School_Folder_Name, fileName, req.file.buffer)
        .then((filePath) => {
          console.log(`File ${fileName} added at path: ${filePath}`);
        })
        .catch((error) => {
          console.error(`Error adding file: ${error}`);
          return next(new ErrorHandler("Error uploading file", 500));
        });
    }

    existingUser.set(req.body);
    existingUser.image = fileName;

    await existingUser.save();

    return res.status(200).json({
      success: true,
      message: "User has been updated successfully!",
      data: existingUser,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error, Try Again Later",
    });
  }
});

//  !! CREATING A SEPARATE GET ROUTE FOR SELECT OPTIONS That will return only name and _id
exports.getAllStudentOption = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  try {
    const allRecords = await User.find({
      school: School_Id,
      role: "student",
    }).exec();

    if (!allRecords) {
      return next(new ErrorHandler("No  students were  found", 404));
    }

    const allStudentsOptions = allRecords.map((item) => {
      return {
        name: item.name + " - " + "class: " + item.currentClass + " - " + " sec: " + item.studentSection + " - " + " roll: " + item?.currentRollNo,
        _id: item._id,
      };
    });

    console.log(allStudentsOptions);

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allStudentsOptions,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

exports.getAllStudentsBasedOnClassAndSection = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { className, section } = req.body;
  const sectionArray = JSON.parse(section);

  console.log(sectionArray);
  console.log(className);
  try {
    const allRecords = await User.find({
      school: School_Id,
      role: "student",
      currentClass: className,
      studentSection: { $in: sectionArray },
    })
      .populate("school")
      .exec();

    if (!allRecords) {
      return next(new ErrorHandler("No  students were  found", 404));
    }
    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allRecords,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// get all Staff (all user except with role student parent class representative hosteler)
exports.getAllStaffOfParticularSchool = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  try {
    const allRecords = await User.find({
      school: School_Id,
      role: { $nin: ["student", "parent", "class representative", "hosteler"] },
    })
      .populate("school")
      .exec();

    if (!allRecords) {
      return next(new ErrorHandler("No  staff were  found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: allRecords,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Server Error, Try Again Later", 500));
  }
});

// TODO: GET EMPLOYEE ANALYTICS
exports.getStaffStats = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  // get total staffs
  const allStaffs = await User.find({
    school: School_Id,
    role: { $nin: ["student", "parent", "class representative", "hosteler"] },
  }).exec();

  // get total teachers
  const allTeachers = await User.find({
    school: School_Id,
    role: "teacher",
  }).exec();

  // get total admin
  const allAdmins = await User.find({
    school: School_Id,
    role: "admin",
  }).exec();

  // get total staff
  const allStaff = await User.find({
    school: School_Id,
    role: "staff",
  }).exec();

  // get total librarian
  const allLibrarians = await User.find({
    school: School_Id,
    role: "librarian",
  }).exec();

  // get total accountant
  const allAccountants = await User.find({
    school: School_Id,
    role: "accountant",
  }).exec();

  // get total registrar
  const allRegistrars = await User.find({
    school: School_Id,
    role: "registrar",
  }).exec();

  // get total examination officer
  const allExaminationOfficers = await User.find({
    school: School_Id,
    role: "examination officer",
  }).exec();

  // get total driver
  const allDrivers = await User.find({
    school: School_Id,
    role: "driver",
  }).exec();

  // get total canteen staff
  const allCanteenStaffs = await User.find({
    school: School_Id,
    role: "canteen staff",
  }).exec();

  // get total hosteler
  const allHostelers = await User.find({
    school: School_Id,
    role: "hosteler",
  }).exec();

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: {
      allStaffs: allStaffs.length,
      allTeachers: allTeachers.length,
      allAdmins: allAdmins.length,
      allLibrarians: allLibrarians.length,
      allAccountants: allAccountants.length,
      allRegistrars: allRegistrars.length,
      allExaminationOfficers: allExaminationOfficers.length,
      allDrivers: allDrivers.length,
      allCanteenStaffs: allCanteenStaffs.length,
      allHostelers: allHostelers.length,
    },
  });
});

// get last create 3 user with role in params based on  timeStamp
exports.getLastThreeUserWithRole = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const { role } = req.params;

  const allRecords = await User.find({
    school: School_Id,
    role: role,
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("currentClass")
    .exec();

  if (!allRecords) {
    return next(new ErrorHandler("No  staff were  found", 404));
  }
  const totalUser = await User.find({
    school: School_Id,
    role: role,
  }).exec();

  let totalUserLength = 0;
  if (totalUser) {
    totalUserLength = totalUser.length;
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: allRecords,
    totalUserLength: totalUserLength,
  });
});

// get class distribution stats
exports.getStudentDemographic = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  // in User with role student it has currentClass as string
  const allRecords = await User.find({
    school: School_Id,
    role: "student",
  }).exec();

  if (!allRecords) {
    return next(new ErrorHandler("No  students were  found", 404));
  }

  let labels = [];
  let data = [];
  let classData = {};

  // format  data: {
  //   labels: labels,
  //   data: {
  //     label: "Class",
  //     data: data,
  //     backgroundColor: "rgba(54, 162, 235)",
  //     barPercentage: 0.6, // Adjust this value to change the width of the bars
  //     categoryPercentage: 1, // Ensures bars are evenly spaced
  //     borderRadius: 10, // Sets the border radius for the bars
  //   },
  // },

  allRecords.forEach((item) => {
    if (classData[item.currentClass]) {
      classData[item.currentClass] = classData[item.currentClass] + 1;
    } else {
      classData[item.currentClass] = 1;
    }
  });

  for (const [key, value] of Object.entries(classData)) {
    labels.push(key);
    data.push(value);
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: {
      lineChartData: {
        labels: labels,
        data: {
          label: "Class",
          data: data,
          backgroundColor: "#bb84e8",
          barPercentage: 0.6, // Adjust this value to change the width of the bars
          categoryPercentage: 1, // Ensures bars are evenly spaced
          borderRadius: 10, // Sets the border radius for the bars
        },
      },
    },
  });
});

//get boys count and girls count of whole school
exports.getUserCount = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];
  const allRecords = await User.find({
    school: School_Id,
    role: "student",
  }).exec();

  if (!allRecords) {
    return next(new ErrorHandler("No  students were  found", 404));
  }

  let boysCount = 0;
  let girlsCount = 0;
  let othersCount = 0;

  allRecords.forEach((item) => {
    if (item.gender === "male") {
      boysCount = boysCount + 1;
    }
    if (item.gender === "female") {
      girlsCount = girlsCount + 1;
    }
    if (item.gender === "other") {
      othersCount = othersCount + 1;
    }
  });

  // get teacher count , parents count , staff count
  const teacherCount = await User.find({
    school: School_Id,
    role: "teacher",
  }).exec();

  const parentCount = await User.find({
    school: School_Id,
    role: "parent",
  }).exec();

  const staffCount = await User.find({
    school: School_Id,
    role: "staff",
  }).exec();

  const librarianCount = await User.find({
    school: School_Id,
    role: "librarian",
  }).exec();

  const accountantCount = await User.find({
    school: School_Id,
    role: "accountant",
  }).exec();

  let totalTeacherCount = 0;
  let totalParentCount = 0;
  let totalStaffCount = 0;
  let totalLibrarianCount = 0;
  let totalAccountantCount = 0;

  if (teacherCount) {
    totalTeacherCount = teacherCount.length;
  }
  if (parentCount) {
    totalParentCount = parentCount.length;
  }
  if (staffCount) {
    totalStaffCount = staffCount.length;
  }

  if (librarianCount) {
    totalLibrarianCount = librarianCount.length;
  }

  if (accountantCount) {
    totalAccountantCount = accountantCount.length;
  }

  // get teacher male female count
  const teacherMaleCount = await User.find({
    school: School_Id,
    role: "teacher",
    gender: "male",
  });

  const teacherFemaleCount = await User.find({
    school: School_Id,
    role: "teacher",
    gender: "female",
  });

  let totalTeacherMaleCount = 0;
  let totalTeacherFemaleCount = 0;

  if (teacherMaleCount) {
    totalTeacherMaleCount = teacherMaleCount.length;
  }
  if (teacherFemaleCount) {
    totalTeacherFemaleCount = teacherFemaleCount.length;
  }

  const staffMaleCount = await User.find({
    school: School_Id,
    role: "staff",
    gender: "male",
  });

  const staffFemaleCount = await User.find({
    school: School_Id,
    role: "staff",
    gender: "female",
  });

  let totalStaffMaleCount = 0;
  let totalStaffFemaleCount = 0;

  if (staffMaleCount) {
    totalStaffMaleCount = staffMaleCount.length;
  }
  if (staffFemaleCount) {
    totalStaffFemaleCount = staffFemaleCount.length;
  }

  return res.status(200).json({
    success: true,
    message: "Record fetched successfully",
    data: {
      boysCount: boysCount,
      girlsCount: girlsCount,
      othersCount: othersCount,
      totalTeacherCount: totalTeacherCount,
      maleTeacher: totalTeacherMaleCount,
      femaleTeacher: totalTeacherFemaleCount,
      otherTeacher: totalTeacherCount - (totalTeacherMaleCount + totalTeacherFemaleCount),
      totalParentCount: totalParentCount,
      totalStaffCount: totalStaffCount,
      maleStaff: totalStaffMaleCount,
      femaleStaff: totalStaffFemaleCount,
      otherStaff: totalStaffCount - (totalStaffMaleCount + totalStaffFemaleCount),
      totalLibrarianCount: totalLibrarianCount,
      totalAccountantCount: totalAccountantCount,
    },
  });
});

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  const School_Id = req.headers["x-school-id"];

  if (req.body.studentGuardian) {
    req.body.studentGuardian = JSON.parse(req.body.studentGuardian);
  }
  const { email } = req.body;

  await User.findOne({ email }).exec((err, user) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Server Error, Try Again Later", 500));
    }
    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }
  });

  const schoolData = await School.findById({
    _id: req.headers["x-school-id"],
  }).exec();

  if (!schoolData) {
    return next(new ErrorHandler("School not found", 404));
  }

  let fileName = null;
  if (req.file) {
    console.log("File is present, proceeding with upload operations");
    // use original file extension as it is
    fileName = `${Date.now()}.${req.file.originalname.split(".")[1]}`;
    await addFile(req.headers["x-school-unique-id"], fileName, req.file.buffer)
      .then((filePath) => {
        console.log(`File ${fileName} added at path: ${filePath}`);
      })
      .catch((error) => {
        console.error(`Error adding file: ${error}`);
        return next(new ErrorHandler("Error uploading file", 400));
      });
  }

  //  todo: --------------------------->  Assign the ObjectId of the school

  let idNo;

  async function genId() {
    const fourDigitUniqueNumericId = Math.floor(1000 + Math.random() * 9000);

    idNo = fourDigitUniqueNumericId;

    // Check if the generated ID is unique
    const existingUser = await User.findOne({ idNo: idNo, school: School_Id }).exec();

    // If the ID is not unique, recursively generate a new one
    if (existingUser) {
      return genId();
    }

    return idNo;
  }

  // Call genId to generate a unique ID
  const uniqueId = await genId();

  req.body.idNo = uniqueId;

  const newUser = new User(req.body);
  newUser.school = req.headers["x-school-id"];
  newUser.image = fileName;

  await newUser.save((err, success) => {
    if (err) {
      console.log(err);
      return next(new ErrorHandler("Error occured while saving user to db", 500));
    }
    const recentlySavedUserId = newUser._id;

    if (req.body.isUseHostel?.toString() === "true") {
      const dataToSave = {
        school: req.headers["x-school-id"],
        student: recentlySavedUserId,
        hostel: req.body.hostel,
        hostelRoom: req.body.hostelRoom,
        bedOccupied: req.body.bedOccupied,
        roomRegistrationDate: req.body.roomRegistrationDate,
        roomVacatingDate: req.body.roomVacatingDate,
      };

      const newHostelStudent = new HostelStudent(dataToSave);
      newHostelStudent.save(async (err, success) => {
        if (err) {
          console.log(err);
          return next(new ErrorHandler("Error occured while saving user to db", 500));
        }
        console.log("HostelStudent created successfully");

        const hostelRoomId = req.body.hostelRoom;
        const bedOccupied = req.body.bedOccupied;

        await HostelRoom.findById({ _id: hostelRoomId }).exec(async (err, hostelRoom) => {
          if (err) {
            console.log(err);
            return next(new ErrorHandler("Error occured while saving user to db", 500));
          }
          if (!hostelRoom) {
            return next(new ErrorHandler("Hostel room not found", 404));
          }
          hostelRoom.occupiedBed = Number(hostelRoom.occupiedBed) + Number(bedOccupied);

          await hostelRoom.save((err, success) => {
            if (err) {
              console.log(err);
              return next(new ErrorHandler("Error occured while saving user to db", 500));
            }
            console.log("HostelRoom updated successfully");
          });
        });

        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: success,
        });
      });
    } else {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: success,
      });
    }
  });
});

// Get all guardian for particular school
exports.getAllGuardian = catchAsyncErrors(async (req, res, next) => {
  const allStudents = await User.find({ role: "student" }).populate("currentClass").exec();

  if (!allStudents) {
    throw new ErrorHandler(404, "No student records found");
  }

  let studentGuardianList = [];
  const studentDetails = allStudents.map((student) => {
    student.studentGuardian.forEach((guardian) => {
      studentGuardianList.push({
        guardianName: guardian.guardianName,
        guardianContact: guardian.guardianContact,
        guardianAddress: guardian.guardianAddress,
        guardianOccupation: guardian.guardianOccupation,
        guardianPaymentAmount: guardian.guardianPaymentAmount,
        guardianPaymentMethod: guardian.guardianPaymentMethod,
        isLocalGuardian: guardian.isLocalGuardian,
        guardianYearlyIncome: guardian.guardianYearlyIncome,
        guardianRelation: guardian.guardianRelation,
        studentId: student._id,
        name: student.name,
        currentClass: student.currentClass.name,
        currentRollNo: student.currentRollNo,
        studentSection: student.studentSection,
        studentAdmittedYear: student.studentAdmittedYear,
      });
    });
  });

  return res.status(200).json({
    success: true,
    message: "Guardian details fetched successfully",
    data: studentGuardianList,
  });
});
