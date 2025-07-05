import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "./borrowApi";
import { useGetBookQuery } from "../Books/booksApi";
import { useState } from "react";
import toast from "react-hot-toast";

const BorrowForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [borrowBook] = useBorrowBookMutation();
  const { refetch } = useGetBookQuery(bookId!, { skip: !bookId });
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;

    if (quantity < 1) {
      toast.error("Quantity must be at least 1", { position: "top-center" });
      return;
    }
    if (!dueDate) {
      toast.error("Please select a due date", { position: "top-center" });
      return;
    }

    const toastId = toast.loading("Borrowing book...", {
      position: "top-center",
      style: { fontSize: "16px" },
    });

    try {
      await borrowBook({ bookId, data: { quantity, dueDate } }).unwrap();
      await refetch();
      toast.success("✅ Book borrowed successfully!", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
      navigate("/borrow-summary");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to borrow book", {
        id: toastId,
        position: "top-center",
        style: { fontSize: "16px" },
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-4xl font-bold text-blue-600 mb-10 text-center select-none">
        📗 Borrow Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Quantity */}
        <div>
          <label
            htmlFor="quantity"
            className="block mb-3 text-gray-700 font-semibold"
          >
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            placeholder="Enter quantity"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="dueDate"
            className="block mb-3 text-gray-700 font-semibold"
          >
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-white shadow-md transition-colors duration-300"
        >
          Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;
