//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const noticeApi = createApi({
    reducerPath: "noticeAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${globalConstant.serverURL}/api/v1/`
    }),
    endpoints: (builder) => ({
        //create notice
        postAddNotice: builder.mutation({
            query: (payload) => ({
                url: "notices/createNotice",
                method: "POST",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        //get notices
        getAllNotices : builder.mutation({
            query: () => {
                return {
                    url: "notices/allNotices",
                    method: "GET",
                    headers: {
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId")
                    },
                };
            },
        }),

        //update notice
        patchUpdateNotices: builder.mutation({
            query: (payload) => {
                return {
                    url: `notices/updateNotice/${payload.id}`,
                    method: "PATCH",
                    body: payload.formData,
                    formData: true,
                    headers: {
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId")
                    }
                }
            }
        }),

        //delete notice
        deleteNotice: builder.mutation({
            query: (id) => {
                return {
                    url: `notices/deleteNotice/${id}`,
                    method: "DELETE",
                    formData: true,
                    headers:{
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId"),
                    }
                }
            }
        }),

        //your notices
        getYourNotices: builder.mutation({
            query: (noticeFrom) => {
                return {
                    url: `notices/yourNotices/${noticeFrom}`,
                    method: "GET",
                    formData: true,
                    headers:{
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId"),
                    }
                }
            }
        }),

        //notices by role
        getNoticesByRole: builder.mutation({
            query: (role) => {
                return {
                    url: `notices/allNoticesByRole/${role}`,
                    method: "GET",
                    formData: true,
                    headers:{
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId"),
                    }
                }
            }
        })
    })
});

export const {usePostAddNoticeMutation, useGetAllNoticesMutation, useDeleteNoticeMutation, usePatchUpdateNoticesMutation, useGetYourNoticesMutation, useGetNoticesByRoleMutation} = noticeApi;