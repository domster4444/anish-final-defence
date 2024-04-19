// userModal.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const schoolSchema = new Schema({
  //! MAKE SURE TO UPDATE WITH DIGITAL SIGNATURE of principal
  principal_signature: {
    type: String,
  },

  schoolUniqueId: {
    type: String,
    unique: true,
  },
  school_email: {
    type: String,
    unique: true,
  },
  hashed_password: {
    type: String,
    trim: true,
    // lowercase:true,
    // unique:true,
    maxlength: [50, "password cant be more than 50 characters"],
  },
  role: {
    type: String,
    default: "school-account",
  },
  school_name: {
    type: String,
  },
  school_package: {
    type: String,
    enum: ["standard", "ultimate", "premium"],
    default: "standard",
  },
  account_status: {
    type: String,
    enum: ["active", "inactive", "pending"],
    default: "active",
  },
  school_package_renewal_date: {
    type: String,
  },

  school_phone: {
    type: String,
  },

  school_location: {
    type: String,
  },
  school_type: {
    type: String,
    enum: ["public", "private"],
  },
  principal_name: {
    type: String,
  },
  contact_email: {
    type: String,
  },
  contact_phone: {
    type: String,
  },
  website: {
    type: String,
  },
  image: {
    type: String,
  },

  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  postal_code: {
    type: String,
  },

  selectedIdCardFrontTemplate: {
    type: String,
  },
  selectedIdCardBackTemplate: {
    type: String,
  },

  selectedAchievementCertificateTemplate: {
    type: String,
  },
  selectedAdmitCardTemplate: {
    type: String,
  },

  salt: String, //? it tells us how strong the password is hashed.
});

//! ==============================   VIRTUAL METHODS =================================
//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
schoolSchema
  .virtual("password") // this virtual method is going to take the "password"
  .set(function (password) {
    console.log(password);

    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in schoolSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in schoolSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

//! ==============================   METHODS =================================
schoolSchema.methods = {
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

const School = mongoose.model("School", schoolSchema);

module.exports = School;
