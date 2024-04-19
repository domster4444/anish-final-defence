import { globalConstant } from "constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsLetterSubscriptionApi = createApi({
  reducerPath: "newsLetterSubscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1`,
  }),
  endpoints: (builder) => ({
    //* POST ADD BOOK --working
    postSendNewsLetterSubscriptionEmail: builder.mutation({
      query: (formData) => ({
        url: "/subscription-email",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { usePostSendNewsLetterSubscriptionEmailMutation } = newsLetterSubscriptionApi;
