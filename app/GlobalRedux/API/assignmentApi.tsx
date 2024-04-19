//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const assignmentApi = createApi({
    reducerPath: "assignmentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${globalConstant.serverURL}/api/v1/`
    }),
    endpoints: (builder) => ({

        //createAssignment
        postAddAssignment: builder.mutation({
            query: (payload) => (
                {
                    url: "assignments/createAssignment",
                    method: "POST",
                    body: payload.formData,
                    formData: true,
                    headers: {
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId")
                    }
                })
        }),

        //upload image to s3
        postUploadFilesToS3: builder.mutation({
            query: (payload) => (
                {
                    url: "assignments/createAssignment/upload",
                    method: "POST",
                    body: payload.formData,
                    formData: true,
                    headers: {
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId")
                    }
                })
        }),

        //fetch all assignments
        getAllAssignments: builder.mutation({
            query: () => ({
                url: "assignments/allAssignments",
                method: "GET",
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        //view all assignments given by a teacher
        getAllAssignmentsFromTeacher: builder.mutation({
            query: (payload) => ({
                url: `assignments/viewTeachersAssignment/${payload.teacherId}`,
                method: "GET",
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        getAllAssignmentsForStudent: builder.mutation({
            query: (payload) => ({
                url: `assignments/viewStudentsAssignment/${payload.studentId}/${payload.classId}`,
                method: "GET",
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        //update assignment 
        updateAssignment: builder.mutation({
            query: (payload) => ({
                url: `assignments/updateAssignment/${payload.assignmentId}`,
                method: "PATCH",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        //delete assignment
        deleteAssignment: builder.mutation({
            query: (assignmentId) => ({
                url: `assignments/deleteAssignment/${assignmentId}`,
                method: "DELETE",
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),
    })
});

export const { usePostAddAssignmentMutation, useGetAllAssignmentsMutation, useGetAllAssignmentsFromTeacherMutation, useUpdateAssignmentMutation, useDeleteAssignmentMutation, usePostUploadFilesToS3Mutation, useGetAllAssignmentsForStudentMutation } = assignmentApi;