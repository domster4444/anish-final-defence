//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const studentOneTimeAttendanceApi = createApi({
  reducerPath: "studentOneTimeAttendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD studentOneTimeAttendance --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "studentOneTimeAttendance/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL studentOneTimeAttendance FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `studentOneTimeAttendance/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE A SCHOOL -- working
    deleteRecord: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `studentOneTimeAttendance/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  UPDATE studentOneTimeAttendance --working
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `studentOneTimeAttendance/update/${payload._id}`,
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
  }),
});

export const { usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation } = studentOneTimeAttendanceApi;
