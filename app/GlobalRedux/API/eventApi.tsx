//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST gallery --working
    addRecord: builder.mutation({
      query: (formData) => ({
        url: "event/add",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    deleteRecord: builder.mutation({
      query: (payload) => ({
        url: `event/${payload.id}`,
        method: "DELETE",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    getRecordForSpecificSchool: builder.mutation({
      query: () => ({
        url: "event/get",
        method: "GET",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
  }),
});

export const { useAddRecordMutation, useGetRecordForSpecificSchoolMutation, useDeleteRecordMutation } = eventApi;
