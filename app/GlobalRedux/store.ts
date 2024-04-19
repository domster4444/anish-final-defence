//@ts-nocheck
"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { setupListeners } from "@reduxjs/toolkit/query";

//* FEATURES REDUCERS (step1)
import authenticatedReducer from "./Features/authenticatedSlice/authenticatedSlice";
//* RTK QUERY IMPORTS (step I)
import { authenticationApi } from "./API/authenticationApi";
import { libraryApi } from "./API/libraryApi";
import { bookFineApi } from "./API/bookFineApi";
import { librarySettingApi } from "./API/librarySettingApi";
import { contactUsApi } from "./API/contactUsApi";
import { newsLetterSubscriptionApi } from "./API/newsLetterSubscriptionApi";
import { classApi } from "./API/classApi";
import { sectionApi } from "./API/sectionApi";
import { subjectApi } from "./API/subjectApi";
import { schoolUserAuthApi } from "./API/schoolUserAuthApi";
import { schoolApi } from "./API/schoolApi";
import { hostelRoomTypeApi } from "./API/hostelRoomTypeApi";
import { hostelApi } from "./API/hostelApi";
import { hostelRoomApi } from "./API/hostelRoomApi";
import { hostelStudentApi } from "./API/hostelStudentApi";
import { hostelStudentFeesApi } from "./API/hostelStudentFeesApi";
import { streamApi } from "./API/streamApi";
import { incomeHeadApi } from "./API/incomeHeadApi";
import { incomeApi } from "./API/incomeApi";
import { expenseHeadApi } from "./API/expenseHeadApi";
import { expenseApi } from "./API/expenseApi";
import { examTermApi } from "./API/examTermApi";
import { examHallApi } from "./API/examHallApi";
import { admitCardDesignApi } from "./API/admitCardDesignApi";
import { productSupplierApi } from "./API/productSupplierApi";
import { productCategoryApi } from "./API/productCategoryApi";
import { productStoreApi } from "./API/productStoreApi";
import { productApi } from "./API/productApi";
import { galleryApi } from "./API/galleryApi";
import { batchApi } from "./API/batchApi";
import { admittedYearApi } from "./API/admittedYearApi";
import { employeeDepartmentApi } from "./API/employeeDepartmentApi";
import { employeeDesignationApi } from "./API/employeeDesignationApi";
import { canteenItemApi } from "./API/canteenItemApi";
import { canteenItemOrderApi } from "./API/canteenItemOrderApi";
import { vehicleApi } from "./API/vehicleApi";
import { vehicleRouteApi } from "./API/vehicleRouteApi";
import { studentOneTimeAttendanceApi } from "./API/studentOneTimeAttendanceApi";
import { studentPeriodicAttendanceApi } from "./API/studentPeriodicAttendanceApi";
import { idCardDesignApi } from "./API/idCardDesignApi";
import { eventCalendarApi } from "./API/eventCalendarApi";
import { noticeApi } from "./API/noticeAPI";
import { noticeCategoryAPI } from "./API/noticeCategoryAPI";
import { incidentApi } from "./API/incidentApi";
import { assignIncidentApi } from "./API/assignIncidentApi";
import { borrowedBookApi } from "./API/borrowedBookApi";
import { purposeApi } from "./API/purposeApi";
import { referenceApi } from "./API/referenceApi";
import { sourceApi } from "./API/sourceApi";
import { complaintTypeApi } from "./API/complaintTypeApi";
import { phoneCallLogApi } from "./API/phoneCallLogApi";
import { admissionEnquiryApi } from "./API/admissionEnquiryApi";
import { enquiryFollowUpApi } from "./API/enquiryFollowUpApi";
import { complainApi } from "./API/complainApi";
import { visitorBookApi } from "./API/visitorBookApi";
import { postalReceiveApi } from "./API/postalReceiveApi";
import { postalDispatchApi } from "./API/postalDispatchApi";
import { assignmentApi } from "./API/assignmentApi";
import { submissionApi } from "./API/submissionApi";

import { achievementCertificateDesignApi } from "./API/achievementCertificateDesignApi";
import { classTimeTableApi } from "./API/classTimeTableApi";

import { liveEmployeeMeetingApi } from "./API/liveEmployeeMeetingApi";
import { liveClassMeetingApi } from "./API/liveClassMeetingApi";
import { liveClassApi } from "./API/liveClassApi";

// fees
import { feeGroupApi } from "./API/feeGroupApi";
import { feeDiscountApi } from "./API/feeDiscountApi";
import { feeTypeApi } from "./API/feeTypeApi";
import { feeMasterApi } from "./API/feeMasterApi";
//event
import { eventApi } from "./API/eventApi";

//admin
import { postApi } from "./API/postApi";
import { studentAchievementApi } from "./API/studentAchievementApi";

// ! ANISH REDUX API
import { reviewCategoryApi } from "./API/reviewCategoryApi";
import { reviewProductApi } from "./API/reviewProductApi";
import { userRatingApi } from "./API/userRatingApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authenticated"], // place to select which state you want to persist
};

const rootReducer: any = combineReducers({
  ////* (step2)
  // todo (reducer simple state): FEATURES REDUCERS (keep adding below)
  authenticated: authenticatedReducer,

  // * (step II)
  // todo (api query): RTK QUERY REDUCERS (keep adding below)
  [authenticationApi.reducerPath]: authenticationApi.reducer,
  [libraryApi.reducerPath]: libraryApi.reducer,
  [bookFineApi.reducerPath]: bookFineApi.reducer,
  [librarySettingApi.reducerPath]: librarySettingApi.reducer,
  [newsLetterSubscriptionApi.reducerPath]: newsLetterSubscriptionApi.reducer,
  [contactUsApi.reducerPath]: contactUsApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [sectionApi.reducerPath]: sectionApi.reducer,
  [schoolUserAuthApi.reducerPath]: schoolUserAuthApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [hostelRoomTypeApi.reducerPath]: hostelRoomTypeApi.reducer,
  [hostelApi.reducerPath]: hostelApi.reducer,
  [hostelRoomApi.reducerPath]: hostelRoomApi.reducer,
  [hostelStudentApi.reducerPath]: hostelStudentApi.reducer,
  [hostelStudentFeesApi.reducerPath]: hostelStudentFeesApi.reducer,
  [streamApi.reducerPath]: streamApi.reducer,
  [incomeHeadApi.reducerPath]: incomeHeadApi.reducer,
  [incomeApi.reducerPath]: incomeApi.reducer,
  [expenseHeadApi.reducerPath]: expenseHeadApi.reducer,
  [expenseApi.reducerPath]: expenseApi.reducer,
  [examTermApi.reducerPath]: examTermApi.reducer,
  [noticeApi.reducerPath]: noticeApi.reducer,
  [noticeCategoryAPI.reducerPath]: noticeCategoryAPI.reducer,
  [productSupplierApi.reducerPath]: productSupplierApi.reducer,
  [productCategoryApi.reducerPath]: productCategoryApi.reducer,
  [productStoreApi.reducerPath]: productStoreApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [galleryApi.reducerPath]: galleryApi.reducer,
  [batchApi.reducerPath]: batchApi.reducer,
  [schoolApi.reducerPath]: schoolApi.reducer,
  [employeeDepartmentApi.reducerPath]: employeeDepartmentApi.reducer,
  [employeeDesignationApi.reducerPath]: employeeDesignationApi.reducer,
  [examHallApi.reducerPath]: examHallApi.reducer,
  [admitCardDesignApi.reducerPath]: admitCardDesignApi.reducer,
  [canteenItemApi.reducerPath]: canteenItemApi.reducer,
  [canteenItemOrderApi.reducerPath]: canteenItemOrderApi.reducer,
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [vehicleRouteApi.reducerPath]: vehicleRouteApi.reducer,
  [studentOneTimeAttendanceApi.reducerPath]: studentOneTimeAttendanceApi.reducer,
  [studentPeriodicAttendanceApi.reducerPath]: studentPeriodicAttendanceApi.reducer,
  [idCardDesignApi.reducerPath]: idCardDesignApi.reducer,
  [eventCalendarApi.reducerPath]: eventCalendarApi.reducer,
  [incidentApi.reducerPath]: incidentApi.reducer,
  [assignIncidentApi.reducerPath]: assignIncidentApi.reducer,
  [admittedYearApi.reducerPath]: admittedYearApi.reducer,
  [borrowedBookApi.reducerPath]: borrowedBookApi.reducer,
  [purposeApi.reducerPath]: purposeApi.reducer,
  [referenceApi.reducerPath]: referenceApi.reducer,
  [sourceApi.reducerPath]: sourceApi.reducer,
  [complaintTypeApi.reducerPath]: complaintTypeApi.reducer,
  [phoneCallLogApi.reducerPath]: phoneCallLogApi.reducer,
  [admissionEnquiryApi.reducerPath]: admissionEnquiryApi.reducer,
  [enquiryFollowUpApi.reducerPath]: enquiryFollowUpApi.reducer,
  [complainApi.reducerPath]: complainApi.reducer,
  [visitorBookApi.reducerPath]: visitorBookApi.reducer,
  [postalReceiveApi.reducerPath]: postalReceiveApi.reducer,
  [postalDispatchApi.reducerPath]: postalDispatchApi.reducer,
  [achievementCertificateDesignApi.reducerPath]: achievementCertificateDesignApi.reducer,
  [assignmentApi.reducerPath]: assignmentApi.reducer,
  [submissionApi.reducerPath]: submissionApi.reducer,
  [classTimeTableApi.reducerPath]: classTimeTableApi.reducer,
  [liveEmployeeMeetingApi.reducerPath]: liveEmployeeMeetingApi.reducer,
  [liveClassMeetingApi.reducerPath]: liveClassMeetingApi.reducer,
  [liveClassApi.reducerPath]: liveClassApi.reducer,
  [feeGroupApi.reducerPath]: feeGroupApi.reducer,
  [feeDiscountApi.reducerPath]: feeDiscountApi.reducer,
  [feeTypeApi.reducerPath]: feeTypeApi.reducer,
  [feeMasterApi.reducerPath]: feeMasterApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [studentAchievementApi.reducerPath]: studentAchievementApi.reducer,
  [reviewCategoryApi.reducerPath]: reviewCategoryApi.reducer,
  [reviewProductApi.reducerPath]: reviewProductApi.reducer,
  [userRatingApi.reducerPath]: userRatingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  // * (step III)
  // todo (api query): RTK QUERY REDUCERS (keep adding below)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authenticationApi.middleware,
      libraryApi.middleware,
      bookFineApi.middleware,
      librarySettingApi.middleware,
      newsLetterSubscriptionApi.middleware,
      contactUsApi.middleware,
      classApi.middleware,
      sectionApi.middleware,
      schoolUserAuthApi.middleware,
      subjectApi.middleware,
      hostelRoomTypeApi.middleware,
      hostelApi.middleware,
      hostelRoomApi.middleware,
      hostelStudentApi.middleware,
      hostelStudentFeesApi.middleware,
      streamApi.middleware,
      incomeHeadApi.middleware,
      incomeApi.middleware,
      expenseHeadApi.middleware,
      expenseApi.middleware,
      examTermApi.middleware,
      noticeApi.middleware,
      noticeCategoryAPI.middleware,
      productSupplierApi.middleware,
      productCategoryApi.middleware,
      productStoreApi.middleware,
      productApi.middleware,
      galleryApi.middleware,
      batchApi.middleware,
      schoolApi.middleware,
      employeeDepartmentApi.middleware,
      employeeDesignationApi.middleware,
      examHallApi.middleware,
      admitCardDesignApi.middleware,
      canteenItemApi.middleware,
      canteenItemOrderApi.middleware,
      vehicleApi.middleware,
      vehicleRouteApi.middleware,
      studentOneTimeAttendanceApi.middleware,
      studentPeriodicAttendanceApi.middleware,
      idCardDesignApi.middleware,
      eventCalendarApi.middleware,
      incidentApi.middleware,
      assignIncidentApi.middleware,
      admittedYearApi.middleware,
      borrowedBookApi.middleware,
      purposeApi.middleware,
      referenceApi.middleware,
      sourceApi.middleware,
      complaintTypeApi.middleware,
      phoneCallLogApi.middleware,
      admissionEnquiryApi.middleware,
      enquiryFollowUpApi.middleware,
      complainApi.middleware,
      visitorBookApi.middleware,
      postalReceiveApi.middleware,
      postalDispatchApi.middleware,
      achievementCertificateDesignApi.middleware,
      assignmentApi.middleware,
      submissionApi.middleware,
      classTimeTableApi.middleware,
      liveEmployeeMeetingApi.middleware,
      liveClassMeetingApi.middleware,
      liveClassApi.middleware,
      feeGroupApi.middleware,
      feeDiscountApi.middleware,
      feeTypeApi.middleware,
      feeMasterApi.middleware,
      postApi.middleware,
      eventApi.middleware,
      studentAchievementApi.middleware,
      reviewCategoryApi.middleware,
      reviewProductApi.middleware,
      userRatingApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
