import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-zinc-800 bg-black px-6 py-4 flex items-center justify-between">
      <Link
        to="/courses"
        className="text-white font-semibold text-lg tracking-tight"
      >
        LearnHub
      </Link>
      <Link
        to="/enrollments"
        className="text-zinc-400 hover:text-white text-sm transition-colors"
      >
        My Courses
      </Link>
      <div className="flex items-center gap-4">
        {user?.role === "ADMIN" && (
          <Link
            to="/admin"
            className="text-zinc-400 hover:text-white text-sm transition-colors"
          >
            Dashboard
          </Link>
        )}
        <span className="text-zinc-500 text-sm">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
