import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "./booksApi";
import toast from "react-hot-toast";

const EditBookForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetBookQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formState, setFormState] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (data) {
      setFormState({
        title: data.title,
        author: data.author,
        genre: data.genre,
        isbn: data.isbn,
        description: data.description || "",
        copies: data.copies,
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.copies < 0) {
      toast.error("❌ Copies cannot be negative", {
        style: { fontSize: "16px" },
        position: "top-center",
      });
      return;
    }

    const toastId = toast.loading("Updating book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await updateBook({ id: id!, data: formState }).unwrap();
      toast.success("✅ Book updated successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      navigate("/books");
    } catch (err) {
      console.error("Update book error:", err);
      toast.error("❌ Failed to update book.", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  if (isLoading)
    return (
      <div className="mt-10 text-center text-gray-500 font-semibold">
        Loading book data...
      </div>
    );
  if (error)
    return (
      <div className="mt-10 text-center text-red-600 font-semibold">
        Error loading book data.
      </div>
    );

  return (
    <div className="max-w-lg mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg border border-green-200">
      <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center select-none">
        ✏️ Edit Book
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/** Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={formState.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 transition"
            placeholder="Enter book title"
          />
        </div>

        {/** Author */}
        <div>
          <label
            htmlFor="author"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            name="author"
            value={formState.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 transition"
            placeholder="Enter author name"
          />
        </div>

        {/** Genre */}
        <div>
          <label
            htmlFor="genre"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            Genre <span className="text-red-500">*</span>
          </label>
          <input
            id="genre"
            name="genre"
            value={formState.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 transition"
            placeholder="Enter genre"
          />
        </div>

        {/** ISBN */}
        <div>
          <label
            htmlFor="isbn"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            id="isbn"
            name="isbn"
            value={formState.isbn}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 transition"
            placeholder="Enter ISBN number"
          />
        </div>

        {/** Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formState.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 resize-none transition"
            placeholder="Enter book description (optional)"
          />
        </div>

        {/** Copies */}
        <div>
          <label
            htmlFor="copies"
            className="block mb-2 font-semibold text-green-700 select-none"
          >
            Copies <span className="text-red-500">*</span>
          </label>
          <input
            id="copies"
            type="number"
            name="copies"
            min={0}
            value={formState.copies}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent placeholder-gray-400 transition"
            placeholder="Number of copies"
          />
        </div>

        {/** Submit button */}
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed py-3 rounded-lg font-semibold text-white shadow-md transition-colors duration-300"
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
