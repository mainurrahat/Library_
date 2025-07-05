import { Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Footer from "./Home/Footer ";
import BooksList from "../src/Features/Books/BooksList";
import BorrowForm from "../src/Features/Borrow/BorrowForm";
import BorrowSummary from "../src/Features/Borrow/Summary";
import CreateBook from "../src/Features/Books/CreateBook";
import EditBookForm from "../src/Features/Books/EditBookForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />{" "}
      {/* ✅ hot-toast toaster */}
      <div className="flex-grow px-4">
        <Routes>
          <Route path="/" element={<BooksList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
