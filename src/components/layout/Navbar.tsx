import { useState } from "react";
import { Link } from "react-router";
import logo from "../../assets/logo.png";
import { ModeToggle } from "../others/mode-toggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full h-16 px-5 bg-background border-b border-gray-600 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center text-xl">
          <img className="w-12 h-12" src={logo} alt="Logo" />
          <span className="font-bold ml-2">Book</span>Lover
        </div>

        {/* for large device */}
        <div className="hidden md:flex space-x-6 text-base">
          <Link to="/">All Book</Link>
          <Link to="/create-book">Add Book</Link>
          <Link to="/borrow-summary">Borrow Summary</Link>
        </div>

        {/* toggler */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {/* for mobile */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* for mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col mt-2 space-y-2 bg-background border border-gray-600 p-4 rounded-lg">
          <Link to="/" onClick={() => setIsOpen(false)}>
            All Book
          </Link>
          <Link to="/create-book" onClick={() => setIsOpen(false)}>
            Add Book
          </Link>
          <Link to="/borrow-summary" onClick={() => setIsOpen(false)}>
            Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
}
