//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST gallery --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "gallery/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    //* POST gallery --working
    postBulkAddRecord: builder.mutation({
      query: (formData) => ({
        url: "gallery/bulk-upload",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL gallery FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `gallery/get-all-for-school`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    // * GET ALL gallery FOR SPECIFIC SCHOOL --working
    getGalleryStatsController: builder.mutation({
      query: () => {
        return {
          url: `gallery/stats`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE A gallery -- working
    deleteRecord: builder.mutation({
      query: (payload) => {
        console.log("payload=", payload.id);
        return {
          url: `gallery/${payload.id}`,
          method: "DELETE",
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

export const { useGetGalleryStatsControllerMutation, usePostBulkAddRecordMutation, usePostAddRecordMutation, useDeleteRecordMutation, useGetAllRecordForSpecificSchoolMutation } = galleryApi;
