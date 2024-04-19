"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  accountId: string | null;
  isSchoolLoggedIn: boolean | null;
  isUserLoggedIn: boolean | null;
  schoolId: string | null;
  image: string | null;
  role: string | null;
  schoolUniqueId: string | null;
  email: string | null;
  loggedInUserToken: string | null;
  schoolName: string | null;
  schoolImage: string | null;
  schoolStreet: string | null;

  loggedInUserPackage: string | null;
  loggedInUserAccountStatus: string | null;
  loggedInUserPackageRenewalDate: string | null;
  // below property is in user models only
  name: string | null;
  //for students only
  currentClass: string | null;
}

const initialState: CounterState = {
  accountId: null,
  isSchoolLoggedIn: false,
  isUserLoggedIn: false,
  schoolId: null,
  image: null,
  role: null,
  schoolUniqueId: null,
  email: null,
  loggedInUserToken: null,
  schoolName: null,
  schoolImage: null,
  schoolStreet: null,

  loggedInUserPackage: null,
  loggedInUserAccountStatus: null,
  loggedInUserPackageRenewalDate: null,
  // below property is in user models only
  name: null,
  //for students only
  currentClass: null,
};

export const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    setAccountId: (state, action) => {
      state.accountId = action.payload;
    },

    setSchoolId: (state, action) => {
      state.schoolId = action.payload;
    },

    setLoggedInUserPackage: (state, action) => {
      state.loggedInUserPackage = action.payload;
    },
    setLoggedInUserAccountStatus: (state, action) => {
      state.loggedInUserAccountStatus = action.payload;
    },
    setLoggedInUserPackageRenewalDate: (state, action) => {
      state.loggedInUserPackageRenewalDate = action.payload;
    },
    setLoggedInUserToken: (state, action) => {
      state.loggedInUserToken = action.payload;
    },

    setIsSchoolLoggedIn: (state, action) => {
      state.isSchoolLoggedIn = action.payload;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    setSchoolName: (state, action) => {
      state.schoolName = action.payload;
    },

    setSchoolImage: (state, action) => {
      state.schoolImage = action.payload;
    },

    setSchoolStreet: (state, action) => {
      state.schoolStreet = action.payload;
    },

    setSchoolUniqueId: (state, action) => {
      state.schoolUniqueId = action.payload;
    },

    setImage: (state, action) => {
      state.image = action.payload;
    },

    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    //for students
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload;
    },

    // ! LOGOUT
    logout: (state) => {
      state.accountId = null;

      state.loggedInUserPackage = null;
      state.loggedInUserAccountStatus = null;
      state.loggedInUserPackageRenewalDate = null;
      state.loggedInUserToken = null;
      state.schoolId = null;

      state.isUserLoggedIn = null;
      state.isSchoolLoggedIn = null;

      state.schoolUniqueId = null;
      state.image = null;

      state.schoolName = null;
      state.schoolImage = null;
      state.schoolStreet = null;

      // for users
      state.name = null;
      state.email = null;
      state.role = null;

      //for students
      state.currentClass = null;
    },
  },
});

export const {
  setSchoolName,
  setSchoolImage,
  setSchoolStreet,
  setAccountId,
  setSchoolId,
  setSchoolUniqueId,
  setImage,
  setLoggedInUserPackage,
  setLoggedInUserAccountStatus,
  setLoggedInUserPackageRenewalDate,
  setLoggedInUserToken,
  logout,
  setRole,
  setEmail,
  setName,
  setIsUserLoggedIn,
  setIsSchoolLoggedIn,
  setCurrentClass
} = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
