import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";
import Pages from "../utils/pages.utils";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="flex justify-center items-center bg-neutral-800 min-h-screen">
      <div className="flex flex-col gap-8 lg:max-w-7xl mx-auto">
        <section>
          <h1 className="text-4xl text-neutral-300 mb-2">Link Not Found</h1>
          <p className="text-xl text-neutral-300 text-wrap max-w-[50ch] leading-8">
            Oops! It looks like the link you tried to access does not exist or
            has expired.
          </p>
        </section>
        <Button onClick={() => navigate(Pages.home)} className="w-fit">Go back to HooLink</Button>
      </div>
    </main>
  );
}
