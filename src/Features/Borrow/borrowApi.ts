import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { booksApi } from "../Books/booksApi";

// ✅ Type for borrowing input
export interface BorrowInput {
  quantity: number;
  dueDate: string;
}

// ✅ Type for borrow summary item
export interface BorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["Borrow", "Books"],
  endpoints: (builder) => ({
    // 🔹 Borrow book mutation
    borrowBook: builder.mutation<void, { bookId: string; data: BorrowInput }>({
      query: ({ bookId, data }) => ({
        url: `/borrow/${bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { bookId }) => [
        { type: "Borrow" },
        { type: "Books", id: "LIST" },
        { type: "Books", id: bookId },
      ],
      async onQueryStarted({ bookId, data }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            booksApi.util.updateQueryData(
              "getBooks",
              { page: 1, limit: 10 },
              (draft) => {
                const book = draft.data.find((b) => b._id === bookId);
                if (book) {
                  book.copies -= data.quantity;
                  book.available = book.copies > 0;
                }
              }
            )
          );
        } catch {}
      },
    }),

    // 🔹 Get borrow summary query
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => "/borrow/borrow-summary",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: BorrowSummary[];
      }) => response.data,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
