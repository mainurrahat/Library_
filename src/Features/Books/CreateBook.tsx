import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "./booksApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type BookFormInput = {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

const CreateBook = ({ onBookAdded }: { onBookAdded?: () => void }) => {
  const { register, handleSubmit, reset } = useForm<BookFormInput>();
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: BookFormInput) => {
    const toastId = toast.loading("Adding new book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await createBook({ ...data, available: data.available ?? true }).unwrap();
      toast.success("✅ Book added successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      reset();
      onBookAdded?.();
      navigate("/books");
    } catch (error) {
      console.error("CreateBook error:", error);
      toast.error("❌ Failed to add book", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-teal-700 mb-8 text-center select-none">
        📘 Add a New Book
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title")}
            placeholder="Enter book title"
            required
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* Author */}
        <div className="flex flex-col">
          <label
            htmlFor="author"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            {...register("author")}
            placeholder="Enter author name"
            required
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label
            htmlFor="genre"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            Genre <span className="text-red-500">*</span>
          </label>
          <input
            id="genre"
            {...register("genre")}
            placeholder="Enter genre"
            required
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* ISBN */}
        <div className="flex flex-col">
          <label
            htmlFor="isbn"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            id="isbn"
            {...register("isbn")}
            placeholder="Enter ISBN number"
            required
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* Copies */}
        <div className="flex flex-col">
          <label
            htmlFor="copies"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            Copies <span className="text-red-500">*</span>
          </label>
          <input
            id="copies"
            type="number"
            {...register("copies")}
            placeholder="Number of copies"
            required
            min={1}
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 transition"
          />
        </div>

        {/* Available Checkbox */}
        <div className="flex items-center mt-6 md:mt-0 space-x-3 col-span-full">
          <input
            id="available"
            type="checkbox"
            {...register("available")}
            className="w-5 h-5 rounded-md accent-teal-500 cursor-pointer"
          />
          <label
            htmlFor="available"
            className="font-semibold text-teal-700 cursor-pointer select-none"
          >
            Available
          </label>
        </div>

        {/* Description - Full width */}
        <div className="flex flex-col col-span-full">
          <label
            htmlFor="description"
            className="mb-2 font-semibold text-gray-700 select-none"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Enter book description (optional)"
            rows={4}
            className="px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent placeholder-gray-400 resize-none transition"
          />
        </div>

        {/* Submit Button - Full width */}
        <button
          type="submit"
          disabled={isLoading}
          className="col-span-full bg-teal-600 hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-semibold text-white shadow-lg transition-colors duration-300"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
