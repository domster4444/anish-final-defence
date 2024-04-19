//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const schoolUserAuthApi = createApi({
  reducerPath: "schoolUserAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD Schooluser --working
    postRegisterSchoolUser: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    //* POST ADD Schooluser --working
    postRegisterStudent: builder.mutation({
      query: (formData) => ({
        url: "register-student",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    //* POST ADD Schoolteacher --working
    postRegisterSchoolStaff: builder.mutation({
      query: (formData) => ({
        url: "register-staff",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    //* GET all Schooluser for a school --working
    getAllSchoolUserOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-users-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* GET all Schooluser for a school --working
    getStaffStats: builder.mutation({
      query: () => {
        return {
          url: `staff/stats`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* GET all student based on class and section  --working
    getAllStudentBasedOnClassSection: builder.mutation({
      query: (formData) => {
        return {
          url: `get-student-based-on-class-section`,
          method: "POST",
          body: formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Schooldriver for a school --working
    getAllSchoolDriverOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-driver-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all hosteler for a school --working
    getAllSchoolHostelerOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-hosteler-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    getAllSchoolStudentOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-student-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    getAllSchoolGuardianOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-guardian-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all canteen staff for a school --working
    getAllSchoolCanteenStaffOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-canteen-user-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Librarian for a school --working
    getAllSchoolLibrarianOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-librarian-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Teacher for a school --working
    getAllSchoolTeacherOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-school-teacher-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* GET all Teacher for a school --working
    getAllSchoolStaffOfParticularSchool: builder.mutation({
      query: () => {
        return {
          url: `get-all-staff-of-particular-school`,
          method: "POST",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE Schooluser -- working
    deleteSchoolUser: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `delete-user/${payload.userId}`,
          method: "DELETE",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* DELETE staff -- working
    deleteSchoolStaff: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `delete-staff/${payload.userId}`,
          method: "DELETE",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  Schooluser
    patchUpdateSchoolUser: builder.mutation({
      query: (payload) => {
        return {
          url: `update-user/${payload.id}`,
          method: "PATCH",
          body: payload.formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* POST get last 3 create user with role param
    getLastThreeUserWithRole: builder.mutation({
      query: (payload) => ({
        url: `user/get-last-three-created/${payload.role}`,
        method: "POST",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    //* POST get student demographic
    getStudentDemographic: builder.mutation({
      query: () => ({
        url: `user/get-student-demographic`,
        method: "POST",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    //* POST get user count
    getUserCount: builder.mutation({
      query: () => ({
        url: `user/get-user-count`,
        method: "POST",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
  }),
});

export const {
  usePostRegisterStudentMutation,
  useGetStaffStatsMutation,
  usePostRegisterSchoolStaffMutation,
  useDeleteSchoolStaffMutation,
  useGetAllSchoolStaffOfParticularSchoolMutation,
  useGetAllSchoolTeacherOfParticularSchoolMutation,
  usePostRegisterSchoolUserMutation,
  useGetAllStudentBasedOnClassSectionMutation,
  useGetAllSchoolHostelerOfParticularSchoolMutation,
  useDeleteSchoolUserMutation,
  usePatchUpdateSchoolUserMutation,
  useGetAllSchoolUserOfParticularSchoolMutation,
  useGetAllSchoolDriverOfParticularSchoolMutation,
  useGetAllSchoolLibrarianOfParticularSchoolMutation,
  useGetAllSchoolCanteenStaffOfParticularSchoolMutation,
  useGetAllSchoolStudentOfParticularSchoolMutation,
  useGetLastThreeUserWithRoleMutation,
  useGetStudentDemographicMutation,
  useGetUserCountMutation,
  useGetAllSchoolGuardianOfParticularSchoolMutation,
} = schoolUserAuthApi;
