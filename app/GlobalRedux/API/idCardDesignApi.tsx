//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const idCardDesignApi = createApi({
  reducerPath: "idCardDesignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST gallery --working
    postAddRecord: builder.mutation({
      query: (formData) => {
        return {
          url: "idCardDesign/create",
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

    // * GET ALL gallery FOR SPECIFIC SCHOOL --working
    getAllRecordForSpecificSchool: builder.mutation({
      query: () => {
        return {
          url: `idCardDesign/get-all-for-school`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    // //* DELETE A gallery -- working
    deleteRecord: builder.mutation({
      query: (payload) => {
        console.log("payload=", payload.id);
        return {
          url: `idCardDesign/${payload.id}`,
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

export const { usePostAddRecordMutation, useDeleteRecordMutation, useGetAllRecordForSpecificSchoolMutation } = idCardDesignApi;
