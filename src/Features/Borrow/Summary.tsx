import React from "react";
import { useGetBorrowSummaryQuery } from "./borrowApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  ) {
    const fetchError = error as FetchBaseQueryError;
    if (typeof fetchError.data === "string") return fetchError.data;
    if (
      typeof fetchError.data === "object" &&
      fetchError.data !== null &&
      "message" in fetchError.data
    ) {
      return String((fetchError.data as any).message);
    }
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  ) {
    return (error as any).message;
  }

  return "Failed to load summary";
}

const BorrowSummary: React.FC = () => {
  const { data, isLoading, isError, error } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <p className="mt-8 text-indigo-600 text-center font-semibold text-lg animate-pulse">
        Loading borrow summary...
      </p>
    );

  if (isError)
    return (
      <p className="mt-8 text-red-600 text-center font-semibold text-lg">
        Error: {getErrorMessage(error)}
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h2 className="mb-8 text-center text-4xl font-extrabold text-indigo-700 select-none">
        📖 Borrow Summary
      </h2>

      <div className="overflow-x-auto rounded-lg border border-indigo-300 shadow-lg">
        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-indigo-100 text-indigo-900 font-semibold text-lg select-none">
            <tr>
              <th className="px-8 py-4 border border-indigo-300">Title</th>
              <th className="px-8 py-4 border border-indigo-300">ISBN</th>
              <th className="px-8 py-4 border border-indigo-300">
                Total Borrowed
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-indigo-50 even:bg-white odd:bg-indigo-50 transition-colors duration-200"
              >
                <td
                  className="px-8 py-4 border border-indigo-300 truncate"
                  title={item.book.title}
                >
                  {item.book.title}
                </td>
                <td className="px-8 py-4 border border-indigo-300">
                  {item.book.isbn}
                </td>
                <td className="px-8 py-4 border border-indigo-300 font-semibold text-indigo-700">
                  {item.totalQuantity}
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan={3} className="py-8 text-gray-500 font-medium">
                  No borrow summary data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
