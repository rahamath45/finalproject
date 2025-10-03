import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // adjust import

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-200 shadow relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
       
        <Link to="/" className="text-5xl font-bold"> 💪FitApp</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/trainers" className="font-semibold">Trainers</Link>
          <Link to="/classes"  className="font-semibold">Classes</Link>

          {user ? (
            <>
              {user.role === "trainer" && (
                <Link to="/trainers/create" className="px-3 py-1 rounded bg-indigo-600 text-white">
                  Create Profile
                </Link>
              )}
              <Link to="/bookings" className="px-3 py-1 rounded border">My Bookings</Link>
              <button
                onClick={() => { logout(); nav("/"); }}
                className="px-3 py-1 rounded border"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded border">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-indigo-600 text-white">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 md:hidden">
          <Link to="/trainers" onClick={() => setOpen(false)}>Trainers</Link>
          <Link to="/classes" onClick={() => setOpen(false)}>Classes</Link>

          {user ? (
            <>
              {user.role === "trainer" && (
                <Link
                  to="/trainer/create"
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 rounded bg-indigo-600 text-white"
                >
                  Create Profile
                </Link>
              )}
              <Link
                to="/bookings"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded border"
              >
                My Bookings
              </Link>
              <button
                onClick={() => { logout(); nav("/"); setOpen(false); }}
                className="px-3 py-1 rounded border text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded border"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded bg-indigo-600 text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}


