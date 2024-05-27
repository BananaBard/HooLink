import React, { useState } from "react";
import { Button } from "./ui/Button";
import { callCreateLink } from "../services/getLink.service";
import { useMutation } from "@tanstack/react-query";

export const Form: React.FC = (): JSX.Element => {
  const [originalURL, setOriginalURL] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    createLink(originalURL);
  };

  const {mutate: createLink, isPending, data: newLink, isError} = useMutation({
    mutationFn: callCreateLink
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-teal-700 py-6 px-3 rounded-lg flex flex-col gap-2"
      >
        <label>Your url</label>
        <input
          type="text"
          className="py-3 px-1 rounded-lg min-w-[300px] mb-2 text-black"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
        />
        <Button className="" type="submit">
          Generate
        </Button>
      </form>
    {isPending && <p>Sending...</p>}

      {!!newLink?.shortened_url && (
        <a href={newLink.shortened_url} target="_blank">
          Your new shortened link
        </a>
      )}
    </div>
  );
};
