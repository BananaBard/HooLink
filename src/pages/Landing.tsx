import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";
import { useAuth } from "../context/AuthContext";
import useTitle from "../hooks/useTitle";

function LandingPage() {
  const {user} = useAuth();
  const navigate = useNavigate();
  useTitle('HooLink')
  const handleTryItBtn = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  }

  return (
    <div
      className="w-full 
    text-white flex-grow
    bg-neutral-900
    px-4
    "
    >
      <section className="max-w-7xl mx-auto flex flex-col md:items-center py-20 lg:py-44 gap-4 md:gap-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-left md:text-center">
          Your <strong className="text-purple-500">Solution</strong> for Shortening Links
        </h1>
        <h3 className="text-base text-left md:text-2xl md:text-center font-medium text-neutral-400 max-w-screen-md">
          HooLink not only provides a quick and easy solution but also ensures a
          secure and efficient experience for all your links.
        </h3>
        {
          user ? <Button onClick={handleDashboard} className="mt-2">Dashboard</Button> : <Button onClick={handleTryItBtn} className="mt-2">Try it now</Button>
        }
      </section>
    </div>
  );
}

export default LandingPage;
