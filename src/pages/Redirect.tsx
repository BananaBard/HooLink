import { useParams } from "react-router-dom";
import Loader from "../components/utils/Loader";
import { useMutation } from "@tanstack/react-query";
import redirectLinkService from "../queries/redirectLink";
import { useEffect } from "react";

export default function RedirectPage() {
  const { id } = useParams();
  const {
    mutate: redirectLink,
    isPending,
  } = useMutation({
    mutationFn: redirectLinkService,
    onSuccess: () => {
      console.log("Success");
      
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    
    redirectLink(id!);
  }, []);

  return (
    isPending && (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    )
  );
}
