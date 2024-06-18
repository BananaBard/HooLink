import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Pages from "../../utils/pages.utils";

const hoverActive = 'hover:underline hover:decoration-purple-500 hover:decoration-2 hover:underline-offset-4 text-lg'

export default function Header() {
  const { user, signOut } = useAuth();
  return (
    <header className="text-white bg-neutral-900 border-b border-neutral-600">
      <div className="py-4 px-4 md:px-14 lg:px-12 xl:px-0 md:h-16 flex flex-col gap-4 md:flex-row justify-between md:items-center max-w-7xl mx-auto">
        <h2 className="text-bold text-3xl">
          <Link to={Pages.home}>HooLink</Link>
        </h2>
        <nav className="flex gap-8 justify-between items-center">
          <NavLink className={hoverActive} to={Pages.home}>Home</NavLink>
          {user && <NavLink className={hoverActive} to={Pages.dashboard}>Dashboard</NavLink>}

          {user ? (
            <button
              type="button"
              onClick={signOut}
              className="py-2 px-6 rounded-lg border-2 border-neutral-500"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="py-2 px-6 rounded-lg border-2 border-neutral-500"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
