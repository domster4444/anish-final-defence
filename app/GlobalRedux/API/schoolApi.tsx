//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const schoolApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST incomeHead --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "school-register",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),

    // * GET ALL incomeHead FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: (payload) => {
        return {
          url: `get-school-profile/${payload.id}`,
          method: "GET",
          formData: true,
        };
      },
    }),

    //* DELETE A incomeHead -- working
    deleteRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `delete-school/${payload.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    // //* PUT  UPDATE incomeHead --working
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `update-school/${payload.id}`,
          method: "PUT",
          body: payload.formData,
          formData: true,
        };
      },
    }),

    // get all schools

    getAllSchools: builder.mutation({
      query: () => {
        return {
          url: `get-all-school`,
          method: "GET",
          formData: true,
        };
      },
    }),
  }),
});

export const { usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation, useGetAllSchoolsMutation } = schoolApi;
