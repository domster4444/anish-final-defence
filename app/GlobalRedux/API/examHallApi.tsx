//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const examHallApi = createApi({
  reducerPath: "examHallApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST examHall --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "examHall/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL examHall FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `examHall/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE A examHall -- working
    deleteRecord: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `examHall/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* get examHall by id --working
    getRecordById: builder.mutation({
      query: (payload) => {
        return {
          url: `examHall/${payload.id}`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  UPDATE examHall --working
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `examHall/update/${payload._id}`,
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

export const { usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation, useGetRecordByIdMutation } = examHallApi;
