import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="text-white bg-neutral-900 border-b border-neutral-600">
      <div
        className="py-4 h-16 flex justify-between items-center max-w-7xl mx-auto"
      >
        <h2 className="text-bold text-2xl">
          <Link to={"/"}>HooLink</Link>
        </h2>
        {user ? (
          <button
            type="button"
            onClick={signOut}
            className="py-2 px-6 rounded-lg border-2 border-neutral-500"
          >
            Sign out
          </button>
        ) : (
          <Link
            to="/login"
            className="py-2 px-6 rounded-lg border-2 border-neutral-500"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
