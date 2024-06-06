import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const {user} = useAuth();
  const navigate = useNavigate();
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
    bg-neutral-900"
    >
      <section className="max-w-7xl mx-auto flex flex-col items-center py-44 gap-4">
        <h1 className="text-7xl font-bold text-center">
          Your <strong className="text-purple-500">Solution</strong> for Shortening Links
        </h1>
        <h3 className="text-[18px] text-center font-medium text-neutral-400 max-w-screen-md">
          HooLink not only provides a quick and easy solution but also ensures a
          secure and efficient experience for all your links.
        </h3>
        {
          user ? <Button onClick={handleDashboard} className="mt-2">Dashboard</Button> : <Button onClick={handleTryItBtn} className="mt-2">Try it now</Button>
        }
      </section>
      {/* <section className="max-w-7xl mx-auto">
        <h3 className="text-2xl text-white">Features</h3>
      </section> */}
    </div>
  );
}

export default LandingPage;
