import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/books", label: "All Books" },
    { to: "/create-book", label: "Add Book" },
    { to: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <nav className="bg-blue-100 shadow-md text-blue-800 p-4  fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide flex items-center gap-2 select-none"
        >
          <span className="text-2xl">📚</span>
          Library Management
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="
                relative
                font-medium
                text-blue-800
                hover:text-blue-900
                transition-colors duration-300
                before:absolute
                before:-bottom-1
                before:left-0
                before:h-0.5
                before:w-0
                before:bg-blue-900
                before:transition-[width]
                before:duration-300
                hover:before:w-full
              "
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none text-blue-800 hover:text-blue-900 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FaTimes size={24} className="animate-fade-in" />
          ) : (
            <FaBars size={24} className="animate-fade-in" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          max-h-0
          transition-[max-height,opacity,transform]
          duration-500
          ease-in-out
          ${
            isOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3"
          }
        `}
      >
        <div className="flex flex-col space-y-3 mt-3 text-center bg-blue-50 rounded-md shadow-inner py-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="
                block
                text-blue-700
                hover:text-blue-900
                font-semibold
                transition-colors duration-300
                select-none
              "
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
