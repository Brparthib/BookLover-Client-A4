import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["book", "borrowed"],
  endpoints: (builder) => ({
    getAllBook: builder.query({
      query: () => "/books",
      providesTags: ["book"],
    }),
    getBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation({
      query: (book) => ({
        url: "/books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
    editBook: builder.mutation({
      query: ({ id, ...book }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book", "borrowed"],
    }),
    getBorrowSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["borrowed"],
    }),
    borrowBook: builder.mutation({
      query: (borrow) => ({
        url: `/borrow`,
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["book", "borrowed"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useCreateBookMutation,
  useGetBookQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;
