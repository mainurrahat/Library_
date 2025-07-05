import React, { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "./booksApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BooksList: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching } = useGetBooksQuery({
    page,
    limit: 10,
  });

  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    toast(
      (t) => (
        <div
          className="flex flex-col gap-4 bg-white shadow-lg p-6 rounded text-center max-w-sm mx-auto"
          style={{ fontSize: "1.125rem" }}
        >
          <span className="font-semibold text-gray-800">
            Are you sure you want to delete this book?
          </span>
          <div className="flex justify-center gap-4 mt-3">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded text-gray-800 transition"
              onClick={() => toast.dismiss(t.id)}
              style={{ minWidth: "90px" }}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white transition"
              onClick={async () => {
                toast.dismiss(t.id);
                const toastId = toast.loading("Deleting book...", {
                  className: "custom-toast-center",
                });
                try {
                  await deleteBook(id).unwrap();
                  toast.success("✅ Book deleted successfully!", {
                    id: toastId,
                    className: "custom-toast-center",
                  });
                } catch {
                  toast.error("❌ Failed to delete the book.", {
                    id: toastId,
                    className: "custom-toast-center",
                  });
                }
              }}
              style={{ minWidth: "90px" }}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        className: "custom-toast-center",
        style: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "120px",
        },
      }
    );
  };

  if (isLoading)
    return (
      <p className="mt-8 font-semibold text-gray-600 text-lg text-center">
        Loading books...
      </p>
    );
  if (error)
    return (
      <p className="mt-8 font-semibold text-red-600 text-lg text-center">
        Error loading books.
      </p>
    );

  const totalPages = data?.pagination?.totalPages ?? 0;

  return (
    <div className="mx-auto mt-28 px-4 sm:px-6 lg:px-8 max-w-7xl">
      <h2 className="mb-8 font-extrabold text-gray-900 text-3xl text-center select-none">
        📚 Books List
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow">
        <table className="min-w-full table-auto border-collapse text-center">
          <thead className="bg-gray-100 text-gray-900 font-semibold select-none">
            <tr>
              <th className="px-6 py-3 border border-gray-300">Title</th>
              <th className="px-6 py-3 border border-gray-300">Author</th>
              <th className="px-6 py-3 border border-gray-300">Genre</th>
              <th className="px-6 py-3 border border-gray-300">ISBN</th>
              <th className="px-6 py-3 border border-gray-300">Copies</th>
              <th className="px-6 py-3 border border-gray-300">Availability</th>
              <th className="px-6 py-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-8 text-gray-500 font-medium text-lg"
                >
                  No books found.
                </td>
              </tr>
            )}

            {data?.data.map((book) => (
              <tr
                key={book._id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 border border-gray-300 font-semibold">
                  {book.title}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {book.author}
                </td>
                <td className="px-6 py-4 border border-gray-300 italic text-gray-600">
                  {book.genre}
                </td>
                <td className="px-6 py-4 border border-gray-300 font-mono text-sm text-gray-500">
                  {book.isbn}
                </td>
                <td className="px-6 py-4 border border-gray-300">
                  {book.copies}
                </td>
                <td
                  className={`px-6 py-4 border border-gray-300 font-semibold ${
                    book.available ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {book.available ? "Available" : "Unavailable"}
                </td>
                <td className="px-6 py-4 border border-gray-300 space-x-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold px-3 py-1 rounded shadow transition"
                    aria-label={`Edit ${book.title}`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(book._id)}
                    disabled={isDeleting}
                    className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold px-3 py-1 rounded shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={`Delete ${book.title}`}
                  >
                    Delete
                  </button>

                  <Link
                    to={`/borrow/${book._id}`}
                    className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold px-3 py-1 rounded shadow transition"
                    aria-label={`Borrow ${book.title}`}
                  >
                    Borrow
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFetching && (
        <p className="mt-4 font-semibold text-gray-600 text-center">
          Refreshing...
        </p>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 mb-16 max-w-sm mx-auto">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded font-semibold text-gray-800 transition"
          aria-label="Previous Page"
        >
          <FaChevronLeft /> Previous
        </button>

        <span className="font-semibold text-gray-700 text-lg select-none">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
          className="flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2 rounded font-semibold text-gray-800 transition"
          aria-label="Next Page"
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BooksList;
