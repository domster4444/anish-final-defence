//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const classTimeTableApi = createApi({
  reducerPath: "classTimeTableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1/`,
  }),
  endpoints: (builder) => ({
    //* POST record --working
    getAllClassTimeTableName: builder.mutation({
      query: () => ({
        url: "classTimeTable/get-all-timetable-name",
        method: "POST",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),
    getClassTimeTableByClassIdAndSectionName: builder.mutation({
      query: (payload) => ({
        url: `classTimeTable/get-by-classid-and-section`,
        method: "POST",
        body: payload,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    getTeacherTimeTableByTeacherId: builder.mutation({
      query: (payload) => ({
        url: `classTimeTable/get-by-teacherid`,
        method: "POST",
        body: payload,
        formData: true,
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    deleteClassTimeTable: builder.mutation({
      query: (payload) => ({
        url: `classTimeTable/delete/${payload.classTimeTableName}`,
        method: "DELETE",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    getClassesTeacherTeachByTeacherId: builder.mutation({
      query: (classTeacherId) => ({
        url: `/classTimeTable/get-classes-teacher-teach/${classTeacherId}`,
        method: "GET",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    // /classTimeTable/get-subjects-by-class-teacher-id/:classTeacherId/:classId
    getSubjectsByTeacherId: builder.mutation({
      query: (payload) => ({
        url: `/classTimeTable/get-subjects-by-class-teacher-id/${payload.classTeacherId}/${payload.classId}`,
        method: "GET",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    }),

    getAllClassesForDay: builder.mutation({
      query: () => ({
        url: "/classTimeTable/get-get-all-classes-for-day",
        method: "POST",
        headers: {
          "x-school-id": getDataByValue("schoolId"),
          "x-school-unique-id": getDataByValue("schoolUniqueId"),
        },
      }),
    })

  }),
});

export const { useGetSubjectsByTeacherIdMutation, useGetClassesTeacherTeachByTeacherIdMutation, useGetTeacherTimeTableByTeacherIdMutation, useGetClassTimeTableByClassIdAndSectionNameMutation, useGetAllClassTimeTableNameMutation, useDeleteClassTimeTableMutation, useGetAllClassesForDayMutation } = classTimeTableApi;
