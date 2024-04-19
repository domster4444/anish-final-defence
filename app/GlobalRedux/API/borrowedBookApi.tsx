//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const borrowedBookApi = createApi({
  reducerPath: "borrowedBookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST record --working
    postAddRecord: builder.mutation({
      query: (formData) => ({
        url: "borrowedBook/create",
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
          url: `borrowedBook/get-all-for-school`,
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
          url: `borrowedBook/${body.id}`,
          method: "DELETE",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* get all borrowers for a book
    getAllBorrowers: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/get-all-borrowers/${payload.id}`,
          method: "GET",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* get calculated fine for borrowed book
    getCalculatedFine: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/calculate-fine/${payload.id}`,
          method: "POST",
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //* return a book (partial return or complete)
    returnBook: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/return-borrowed-book/${payload.id}`,
          method: "POST",
          body: payload.formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //*pay fine route
    payBookFine: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/pay-fine/${payload.id}`,
          method: "POST",
          body: payload.formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),
    //*pay lost book fine route
    payLostBookFine: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/lost-book-fine/${payload.id}`,
          method: "POST",
          body: payload.formData,
          formData: true,
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* pay damaged book fine route
    payDamagedBookFine: builder.mutation({
      query: (payload) => {
        return {
          url: `borrowedBook/damaged-book-fine/${payload.id}`,
          method: "POST",
          body: payload.formData,
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
          url: `borrowedBook/update/${payload._id}`,
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

export const {
  usePayDamagedBookFineMutation,
  usePayLostBookFineMutation,
  usePayBookFineMutation,
  useReturnBookMutation,
  useGetCalculatedFineMutation,
  useGetAllBorrowersMutation,
  usePostAddRecordMutation,
  useGetAllRecordForSpecificSchoolMutation,
  useDeleteRecordMutation,
  usePatchUpdateRecordMutation,
} = borrowedBookApi;
