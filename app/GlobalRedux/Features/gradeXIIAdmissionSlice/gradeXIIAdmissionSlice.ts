"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //! Step 1
  // student information
  firstname: "",
  middlename: " ",
  lastname: "",
  province: "",
  district: "",
  municipality: "",
  dob: "",
  nationality: "",
  religion: "",
  gender: "",
  cell: "",
  email_address: "",

  // parents information
  //father
  father_firstname: "",
  father_lastname: "",
  father_middlename: "",
  father_cell: "",
  father_email: "",
  father_province: "",
  father_district: "",
  father_municipality: "",

  //mother
  mother_firstname: "",
  mother_lastname: "",
  mother_middlename: "",
  mother_cell: "",
  mother_email: "",
  mother_province: "",
  mother_district: "",
  mother_municipality: "",

  //local guardian
  local_guardian_firstname: "",
  local_guardian_lastname: "",
  local_guardian_middlename: "",
  local_guardian_cell: "",
  local_guardian_email: "",
  local_guardian_province: "",
  local_guardian_district: "",
  local_guardian_municipality: "",

  //! Step 2
  board: "",
  grade: "",
  passedYear: "",
  institutionName: "",
  schoolType: "",

  //! Step 3
  academicInformation: [],

  //! Step 4
  ppSizePhoto: null,
  gradeXMarksheet: null,
  //characterCertificate  & transferCertificate  are optional
  previousSchoolCharacterCertificate: null,
  previousSchoolTransferCertificate: null,

  //! Step 5
  stream: "",
  subjectChoice: "",

  //! Step 6
  personalStatement: "",

  //! Step 7
  studentSignature: null,
  guardianSignature: null,
};

export const gradeXIIAdmissionSlice = createSlice({
  name: "gradeXIIAdmission",
  initialState,
  reducers: {
    //! Step 1
    // student information
    setFirstname: (state, action) => {
      state.firstname = action.payload;
    },
    setMiddlename: (state, action) => {
      state.middlename = action.payload;
    },
    setLastname: (state, action) => {
      state.lastname = action.payload;
    },
    setProvince: (state, action) => {
      state.province = action.payload;
    },
    setDistrict: (state, action) => {
      state.district = action.payload;
    },
    setMunicipality: (state, action) => {
      state.municipality = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setNationality: (state, action) => {
      state.nationality = action.payload;
    },
    setReligion: (state, action) => {
      state.religion = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setCell: (state, action) => {
      state.cell = action.payload;
    },
    setEmail: (state, action) => {
      state.email_address = action.payload;
    },

    // parents information
    //father
    setFatherFirstname: (state, action) => {
      state.father_firstname = action.payload;
    },
    setFatherLastname: (state, action) => {
      state.father_lastname = action.payload;
    },
    setFatherMiddlename: (state, action) => {
      state.father_middlename = action.payload;
    },
    setFatherCell: (state, action) => {
      state.father_cell = action.payload;
    },
    setFatherEmail: (state, action) => {
      state.father_email = action.payload;
    },
    setFatherProvince: (state, action) => {
      state.father_province = action.payload;
    },
    setFatherDistrict: (state, action) => {
      state.father_district = action.payload;
    },
    setFatherMunicipality: (state, action) => {
      state.father_municipality = action.payload;
    },

    //mother
    setMotherFirstname: (state, action) => {
      state.mother_firstname = action.payload;
    },
    setMotherLastname: (state, action) => {
      state.mother_lastname = action.payload;
    },
    setMotherMiddlename: (state, action) => {
      state.mother_middlename = action.payload;
    },
    setMotherCell: (state, action) => {
      state.mother_cell = action.payload;
    },
    setMotherEmail: (state, action) => {
      state.mother_email = action.payload;
    },
    setMotherProvince: (state, action) => {
      state.mother_province = action.payload;
    },
    setMotherDistrict: (state, action) => {
      state.mother_district = action.payload;
    },
    setMotherMunicipality: (state, action) => {
      state.mother_municipality = action.payload;
    },

    //local guardian
    setLocalGuardianFirstname: (state, action) => {
      state.local_guardian_firstname = action.payload;
    },
    setLocalGuardianLastname: (state, action) => {
      state.local_guardian_lastname = action.payload;
    },
    setLocalGuardianMiddlename: (state, action) => {
      state.local_guardian_middlename = action.payload;
    },
    setLocalGuardianCell: (state, action) => {
      state.local_guardian_cell = action.payload;
    },
    setLocalGuardianEmail: (state, action) => {
      state.local_guardian_email = action.payload;
    },
    setLocalGuardianProvince: (state, action) => {
      state.local_guardian_province = action.payload;
    },
    setLocalGuardianDistrict: (state, action) => {
      state.local_guardian_district = action.payload;
    },
    setLocalGuardianMunicipality: (state, action) => {
      state.local_guardian_municipality = action.payload;
    },

    //! Step 2
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setGrade: (state, action) => {
      state.grade = action.payload;
    },
    setPassedYear: (state, action) => {
      state.passedYear = action.payload;
    },
    setInstitutionName: (state, action) => {
      state.institutionName = action.payload;
    },
    setSchoolType: (state, action) => {
      state.schoolType = action.payload;
    },

    //! Step 3
    setAcademicInformation: (state, action) => {
      state.academicInformation = action.payload;
    },

    //! Step 4
    setPpSizePhoto: (state, action) => {
      state.ppSizePhoto = action.payload;
    },
    setGradeXMarksheet: (state, action) => {
      state.gradeXMarksheet = action.payload;
    },
    setPreviousSchoolCharacterCertificate: (state, action) => {
      state.previousSchoolCharacterCertificate = action.payload;
    },
    setPreviousSchoolTransferCertificate: (state, action) => {
      state.previousSchoolTransferCertificate = action.payload;
    },

    //! Step 5
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setSubjectChoice: (state, action) => {
      state.subjectChoice = action.payload;
    },

    //! Step 6
    setPersonalStatement: (state, action) => {
      state.personalStatement = action.payload;
    },

    //! Step 7
    setStudentSignature: (state, action) => {
      state.studentSignature = action.payload;
    },
    setGuardianSignature: (state, action) => {
      state.guardianSignature = action.payload;
    },
  },
});

export const {
  //! Step 1
  // student information
  setFirstname,
  setMiddlename,
  setLastname,
  setProvince,
  setDistrict,
  setMunicipality,
  setDob,
  setNationality,
  setReligion,
  setGender,
  setCell,
  setEmail,

  // parents information
  //father
  setFatherFirstname,
  setFatherLastname,
  setFatherMiddlename,
  setFatherCell,
  setFatherEmail,
  setFatherProvince,
  setFatherDistrict,
  setFatherMunicipality,

  //mother
  setMotherFirstname,
  setMotherLastname,
  setMotherMiddlename,
  setMotherCell,
  setMotherEmail,
  setMotherProvince,
  setMotherDistrict,
  setMotherMunicipality,

  //local guardian
  setLocalGuardianFirstname,
  setLocalGuardianLastname,
  setLocalGuardianMiddlename,
  setLocalGuardianCell,
  setLocalGuardianEmail,
  setLocalGuardianProvince,
  setLocalGuardianDistrict,
  setLocalGuardianMunicipality,

  //! Step 2
  setBoard,
  setGrade,
  setPassedYear,
  setInstitutionName,
  setSchoolType,

  //! Step 3
  setAcademicInformation,

  //! Step 4
  setPpSizePhoto,
  setGradeXMarksheet,
  setPreviousSchoolCharacterCertificate,
  setPreviousSchoolTransferCertificate,

  //! Step 5
  setStream,
  setSubjectChoice,

  //! Step 6
  setPersonalStatement,

  //! Step 7
  setStudentSignature,
  setGuardianSignature,
} = gradeXIIAdmissionSlice.actions;
export default gradeXIIAdmissionSlice.reducer;
