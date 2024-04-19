import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { globalConstant } from "constant/constant";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/`,
  }),
  endpoints: (builder) => ({
    //    post request on api/v1/school-login (school_email, password) as form data
    postSchoolLogin: builder.mutation({
      query: (body) => {
        return {
          url: `api/v1/school-login`,
          method: "POST",
          body: body,
        };
      },
    }),

    postUserLogin: builder.mutation({
      query: (body) => {
        console.log("🖨️ AuthenticationApi.tsx : ", body);
        return {
          url: `api/v1/login`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export const { usePostSchoolLoginMutation, usePostUserLoginMutation } = authenticationApi;
