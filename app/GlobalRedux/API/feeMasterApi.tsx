//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const feeMasterApi = createApi({
  reducerPath: "feeMasterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST record --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "feeMaster/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // * GET ALL record FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `feeMaster/get-all-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* DELETE A record -- working
    deleteRecord: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `feeMaster/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  UPDATE record --working
    patchUpdateRecord: builder.mutation({
      query: (payload) => {
        console.log(payload);
        return {
          url: `feeMaster/update/${payload._id}`,
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

export const { usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation } = feeMasterApi;
