import { globalConstant } from "constant/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${globalConstant.serverURL}/api/v1`,
  }),
  endpoints: (builder) => ({
    //* POST ADD BOOK --working
    postSendContactUsEmail: builder.mutation({
      query: (formData) => ({
        url: "/contactus-email",
        method: "POST",
        body: formData,
        formData: true,
      }),
    }),
  }),
});

export const { usePostSendContactUsEmailMutation } = contactUsApi;
