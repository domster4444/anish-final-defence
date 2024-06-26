//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const eventCalendarApi = createApi({
  reducerPath: "eventCalendarApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST incomeHead --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "eventCalendar/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL incomeHead FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `eventCalendar/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE A incomeHead -- working
    deleteRecord: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `eventCalendar/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  UPDATE incomeHead --working
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `eventCalendar/update/${payload.id}`,
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

    postBulkUploadRecord: builder.mutation({
      query: (formData) => ({
        url: "eventCalendar/bulk-upload",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
  }),
});

export const { usePostBulkUploadRecordMutation, usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation } = eventCalendarApi;
