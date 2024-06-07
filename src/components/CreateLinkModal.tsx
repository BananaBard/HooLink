"use client";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callCreateLink from "../queries/callCreateLink";
import { Button } from "./buttons/Button";
import { useAuth } from "../context/AuthContext";
import { queryKeys } from "../utils/queryKeys.utils";
import Loader from "./utils/Loader";
import { toast } from "sonner";
import Dialog from "./modals/Dialog";

interface LinkModal {
  isCTA: Boolean;
}

export const CreateLinkModal: React.FC<LinkModal> = ({
  isCTA,
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [originalURL, setOriginalURL] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (originalURL === "") {
      toast.warning("Empty or invalid URL.");
      return;
    }
    if (description.length > 140) {
      toast.warning("Description to long, should be less than 140 characters.");
      return;
    }
    createLink({
      originalURL,
      expTimeInMinutes: 1440,
      description,
      creator: user?.id!,
    });
  };

  const { mutate: createLink, isPending } = useMutation({
    mutationFn: callCreateLink,
    onSuccess: () => {
      dialogRef.current!.close();
      setOriginalURL("");
      setDescription("");
      queryClient.invalidateQueries({ queryKey: queryKeys.links.userLinks });
    },
  });

  const showModal = () => {
    dialogRef?.current!.showModal();
  };

  const hideModal = () => {
    dialogRef.current?.close();
  };

  const ctaStyle: string = `bg-purple-600 py-3 px-2 rounded-md w-[128px] font-medium
    hover:transition-all hover:scale-105
    outline-none ring-teal-600 ring-offset-2
    text-white
    focus-visible:ring-2 
    disabled:bg-slate-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none`;

  return (
    <div>
      <button
        className={
          isCTA ? ctaStyle : "py-2 px-6 rounded-lg border-2 border-neutral-500"
        }
        onClick={showModal}
      >
        Create Link
      </button>
      <Dialog dialogRef={dialogRef}>
        <form
          method="dialog"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          {/* {isPending && <Loader/>} */}

          <fieldset className="flex flex-col gap-2">
            <label htmlFor="url" className="text-neutral-400">
              Your url
            </label>
            <input
              id="url"
              type="text"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400  rounded-lg min-w-[300px] text-white"
              value={originalURL}
              onChange={(e) => setOriginalURL(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="description" className="text-neutral-400">
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              maxLength={140}
              placeholder="This link was shortened to save space when referencing it in my personal blog!"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400  rounded-lg min-w-[300px] text-white"
            ></textarea>
          </fieldset>
          <Button type="submit" className="w-full" disabled={isPending}>
            Generate
          </Button>
          <button
            type="button"
            className="p-2 bg-neutral-600 rounded-full size-10 absolute top-1 right-1 mt-1 mr-1"
            onClick={hideModal}
          >
            X
          </button>
        </form>
      </Dialog>
    </div>
  );
};
