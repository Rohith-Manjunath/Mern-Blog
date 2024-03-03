import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:2000/api/v1/" }),
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "blogs",
        method: "GET",
        credentials: "include",
      }),
    }),
    getBlogById: builder.query({
      query: (blogId) => ({
        url: `blog/${blogId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getMyBlogs: builder.query({
      query: () => ({
        url: `me/blogs`,
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `blog/${blogId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateBlog: builder.mutation({
      query: ({ blogId, data }) => ({
        url: `blog/${blogId}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useGetMyBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogsApi;
