//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const assignIncidentApi = createApi({
  reducerPath: "assignIncidentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST incomeHead --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "assignIncident/create",
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
          url: `assignIncident/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    // * GET ALL record statistics FOR SPECIFIC SCHOOL --working
    getAllRecordStatsForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `assignIncident/get-all-stats`,
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
          url: `assignIncident/${body.id}`,
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
          url: `assignIncident/update/${payload._id}`,
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

export const { useGetAllRecordStatsForSpecificSchoolMutation, usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation } = assignIncidentApi;
