//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const canteenItemOrderApi = createApi({
  reducerPath: "canteenItemOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* GET record  for specific user --working
    getAllRecordForSpecificUser: builder.mutation({
      query: (payload) => {
        return {
          url: `canteenItemOrder/get-all-for-user/${payload.id}`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* For specific school, get all record with status undelivered(pending) orders --working
    getAllPendingOrderRecord: builder.mutation({
      query: () => {
        return {
          url: `canteenItemOrder/get-all-pending-order-for-school`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* POST record --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "canteenItemOrder/create",
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
          url: `canteenItemOrder/get-all-for-school`,
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
          url: `canteenItemOrder/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  Cancel Order by updating if not  ready or  delivered  record --working
    cancelOrder: builder.mutation({
      query: (payload) => {
        return {
          url: `canteenItemOrder/cancel-order/${payload.id}`,
          method: "PATCH",
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
        return {
          url: `canteenItemOrder/update/${payload.id}`,
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

export const { useGetAllPendingOrderRecordMutation, useCancelOrderMutation, usePostAddRecordMutation, useGetAllRecordForSpecificSchoolMutation, useDeleteRecordMutation, usePatchUpdateRecordMutation, useGetAllRecordForSpecificUserMutation } = canteenItemOrderApi;
