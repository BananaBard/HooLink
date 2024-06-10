import { useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import { useMutation } from "@tanstack/react-query";
import redirectLinkService from "../queries/redirectLink";
import { useEffect } from "react";

export default function RedirectPage() {
  const { id } = useParams();
  const { mutate: redirectLink, isPending } = useMutation({
    mutationFn: redirectLinkService,
  });

  useEffect(() => {
    redirectLink(id!);
  }, []);

  return (
    isPending && (
      <div className="flex flex-col gap-24 items-center py-44 bg-neutral-800 min-h-screen">
        <div className="text-center text-neutral-300 ">
          <h2 className="text-2xl font-semibold">HooLink</h2>
          <p className="text-4xl mt-4 font-bold">Redirecting</p>
        </div>
        <Loader />
      </div>
    )
  );
}
