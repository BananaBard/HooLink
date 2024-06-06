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
  isCTA: Boolean
}

export const CreateLinkModal: React.FC<LinkModal> = ({isCTA}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [originalURL, setOriginalURL] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if(originalURL === "") {
      toast.error('Empty or invalid URL.');
      return
    }
    createLink({ url: originalURL, expiresAt: 1440, id: user?.id! });
  };

  const { mutate: createLink, isPending } = useMutation({
    mutationFn: callCreateLink,
    onSuccess: () => {
      dialogRef.current!.close();
      setOriginalURL('');
      queryClient.invalidateQueries({ queryKey: queryKeys.links.userLinks });
    },
    onError: () => {
      dialogRef.current!.close();
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
    disabled:bg-slate-500 disabled:text-gray-300 disabled:cursor-not-allowed disabled:shadow-none`

  return (
    <div>
      <button
        className={isCTA ? ctaStyle : 'py-2 px-6 rounded-lg border-2 border-neutral-500' }
        onClick={showModal}
      >
        Create Link
      </button>
      <Dialog dialogRef={dialogRef}>

        {!isPending ? (
          <form
            method="dialog"
            onSubmit={handleSubmit}
            className="flex flex-row gap-2 items-center"
          >
            <label className="text-neutral-400">Your url</label>
            <input
              type="text"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400  rounded-lg min-w-[300px] text-white"
              value={originalURL}
              onChange={(e) => setOriginalURL(e.target.value)}
            />
            <Button type="submit">Generate</Button>
            <button
              type="button"
              className="p-2 bg-neutral-600 rounded-full size-10 absolute top-1 right-1 mt-1 mr-1"
              onClick={hideModal}
            >
              X
            </button>
          </form>
        ) : (
          <Loader/>
        )}
      </Dialog>
    </div>
  );
};
