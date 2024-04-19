//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const postalDispatchApi = createApi({
  reducerPath: "postalDispatchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD RECORD
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "postalDispatch/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL RECORD FOR SPECIFIC SCHOOL
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `postalDispatch/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE  RECORD
    deleteRecord: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `postalDispatch/delete/${body.bookId}`,
          method: "DELETE",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  RECORD
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        return {
          url: `postalDispatch/update/${payload.bookId}`,
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

export const { usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation } = postalDispatchApi;
