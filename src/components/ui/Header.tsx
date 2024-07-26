import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Pages from "../../utils/pages.utils";
import { Button } from "../buttons/Button";

const hoverActive = 'hover:underline hover:decoration-purple-500 hover:decoration-2 hover:underline-offset-4 md:text-lg'

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="text-white bg-neutral-900 border-b border-neutral-600">
      <div className="py-4 px-4 md:px-14 lg:px-12 xl:px-0 md:h-16 flex gap-4 md:flex-row justify-between items-center max-w-7xl mx-auto">
        <h2 className="text-bold md:hidden text-xl">
          <Link to={Pages.home}>HooLink</Link>
        </h2>
        <h2 className="hidden md:block text-bold text-3xl">
          <Link to={Pages.home}>HooLink</Link>
        </h2>
        <nav className="flex gap-4 md:gap-8 justify-between items-center">
          <NavLink className={hoverActive} to={Pages.home}>Home</NavLink>
          {user && <NavLink className={hoverActive} to={Pages.dashboard}>Dashboard</NavLink>}

          {user ? (
            <button
              type="button"
              onClick={signOut}
              className="inline-flex justify-center items-center py-2 px-6 rounded-lg border-2 border-neutral-500"
            >
              Log out
            </button>
          ) : (
            <Button className="hidden sm:block" onClick={() => navigate('/login')}>Login</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
