//@ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";
import { getDataByValue } from "services/LocalStorageService";

export const noticeCategoryAPI = createApi({
    reducerPath: "noticeCategoryAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${globalConstant.serverURL}/api/v1/`
    }),
    endpoints: (builder) => ({

        //create category
        postAddNoticeCategory: builder.mutation({
            query: (payload) => ({
                url: "notice-category/create",
                method: "POST",
                body: payload.formData,
                formData: true,
                headers: {
                    "x-school-id": getDataByValue("schoolId"),
                    "x-school-unique-id": getDataByValue("schoolUniqueId")
                }
            })
        }),

        //get all notice category
        getAllNoticeCategories : builder.mutation({
            query: () => {
                return {
                    url: "notice-category/getAllCategories",
                    method: "GET",
                    headers: {
                        "x-school-id": getDataByValue("schoolId"),
                        "x-school-unique-id": getDataByValue("schoolUniqueId")
                    },
                };
            },
        }),

        //delete notice
        deleteNoticeCategory : builder.mutation({
            query: (id) => {
                return {
                    url: `notice-category/delete/${id}`,
                    method: "DELETE",
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

export const {usePostAddNoticeCategoryMutation, useGetAllNoticeCategoriesMutation, useDeleteNoticeCategoryMutation} = noticeCategoryAPI;