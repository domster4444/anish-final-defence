//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST ADD BOOK --working
    postAddBook: builder.mutation({
      query: (formData) => ({
        url: "book/create",
        method: "POST",
        body: formData,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),


    // * CHECKED AND USED --working
    getAllBookForSpecificSchool: builder.mutation({
      query: (body) => {
        return {
          url: `book/get-all-for-school/${body.school}`,
          method: "GET",
        };
      },
    }),

    //* DELETE -- working
    deleteBook: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: `book/delete/${body.bookId}`,
          method: "DELETE",
          headers: {
            "x-school-id": getDataByValue("schoolId"),
            "x-school-unique-id": getDataByValue("schoolUniqueId"),
          },
        };
      },
    }),

    //* PATCH  BOOK --working
    patchUpdateBook: builder.mutation({
      query: (payload) => {
        return {
          url: `book/update/${payload.bookId}`,
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

export const { useGetAllBookOptionMutation, usePostAddBookMutation, useDeleteBookMutation, useGetAllBookForSpecificSchoolMutation, usePatchUpdateBookMutation } = libraryApi;
