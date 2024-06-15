"use client";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import callCreateLink from "../../queries/callCreateLink";
import { Button } from "../buttons/Button";
import { useAuth } from "../../context/AuthContext";
import { queryKeys } from "../../utils/queryKeys.utils";
import { toast } from "sonner";
import Dialog from "./Dialog";
import { Link } from "../../types";

interface LinkModal {
  isCTA: boolean;
  shouldSort: boolean;
  sortMethod: string;
  isAscending: boolean;
  userLinks?: Link[]
}

export const CreateLinkModal: React.FC<LinkModal> = ({
  isCTA,
  shouldSort,
  sortMethod,
  isAscending,
  userLinks
}): JSX.Element => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [originalURL, setOriginalURL] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  let tagsArr: Array<string>;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (originalURL === "") {
      toast.warning("Empty or invalid URL.", {
        duration: 5000
      });
      return;
    }
    if (description.length > 140) {
      toast.warning("Description to long", {
        description: 'Your description should be less than 140 characters.',
        duration: 5000
      });
      return;
    }

    if (checkValidTags() === false) {
      toast.warning("To many tags", {
        description: 'Tags should be 3 or less.',
        duration: 5000
      }
      );
      return;
    }

    if (checkLinksLimit() === false) {
      toast.error('Can not create link', {
        duration: 5000,
        description: 'You reached your links limit, delete one or more to keep using HooLink'
      });
      return;
    }

    createLink({
      originalURL,
      expTimeInMinutes: 1440,
      description,
      creator: user?.id!,
      tags: tagsArr,
    });
  };

  const { mutate: createLink, isPending } = useMutation({
    mutationFn: callCreateLink,
    onSuccess: () => {
      dialogRef.current!.close();
      setOriginalURL("");
      setDescription("");
      setTags("");
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.links.userLinks,
          shouldSort,
          sortMethod,
          isAscending,
        ],
      });
    },
  });

  const showModal = () => {
    dialogRef?.current!.showModal();
  };

  const hideModal = () => {
    dialogRef.current?.close();
  };

  const checkValidTags = (): boolean => {
    const cleanedTags = tags.split(",").map((tag) => {
      return tag.trim();
    });
    if (cleanedTags.length > 3) {
      tagsArr = [];
      return false;
    }
    tagsArr = cleanedTags.sort();
    return true;
  };

  const checkLinksLimit = (): boolean => {
    if (userLinks) {
      return userLinks.length < 20
    }
    else return true
  }

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
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="url" className="text-neutral-300 font-medium">
              URL
            </label>
            <input
              id="url"
              type="text"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400 rounded-lg text-white"
              placeholder="https://hoolink.vercel.app"
              value={originalURL}
              onChange={(e) => setOriginalURL(e.target.value)}
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-neutral-300 font-medium"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              maxLength={140}
              placeholder="This link was shortened to save space when referencing it in my personal blog!"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400  rounded-lg text-white"
            ></textarea>
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-neutral-300 font-medium">
              Tags
            </label>
            <input
              id="tags"
              multiple
              type="text"
              className="py-3 px-2 bg-neutral-800 border border-neutral-400  rounded-lg text-white"
              value={tags}
              placeholder="Tags, work, like this!"
              onChange={(e) => setTags(e.target.value)}
            />
            <span className="text-sm text-neutral-300">
              Tags must be separated by comma "," and the maximum amount is 3
              per link.
            </span>
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
