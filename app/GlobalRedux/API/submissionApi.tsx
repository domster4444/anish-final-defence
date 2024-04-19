//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const submissionApi = createApi({
    reducerPath: "submissionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${globalConstant.serverURL}/api/v1/`
    }),
    endpoints: (builder) => ({
        //make a submission
        postSubmitAssignment: builder.mutation({
            query: (payload) => ({
                url: `submissions/submitAssignment/${payload.assignmentId}`,
                method: "POST",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),

        //view all submissions for a assignment
        getSubmittedAssignments: builder.mutation({
            query: (assignmentId) => ({
                url: `submissions/submittedAssignments/${assignmentId}`,
                method: 'GET',
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),

        getSubmissionCount: builder.mutation({
            query: (studentId) => ({
                url: `submissions/countSubmissions/${studentId}`,
                method: 'GET',
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),

        //deleteSubmission
        deleteSubmission: builder.mutation({
            query: (submissionId) => ({
                url: `submissions/deleteSubmission/${submissionId}`,
                method: "DELETE",
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),

        //update grade
        updateGrade: builder.mutation({
            query: (payload) => ({
                url: `submissions/updateGrade/${payload.submissionId}`,
                method: "PATCH",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),

        //update remarks
        updateRemark: builder.mutation({
            query: (payload) => ({
                url: `submissions/updateRemark/${payload.submissionId}`,
                method: "PATCH",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId"),
                }
            })
        }),
    })
});

export const { usePostSubmitAssignmentMutation, useGetSubmittedAssignmentsMutation, useUpdateGradeMutation, useUpdateRemarkMutation, useDeleteSubmissionMutation, useGetSubmissionCountMutation } = submissionApi;