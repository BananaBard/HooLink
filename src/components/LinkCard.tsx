import { Link } from "../types";
import ToolIconBtn from "./buttons/iconButtons/ToolIconBtn";
import ClickCountIcon from "./icons/ClickCountIcon";
import DeleteIconBtn from "./buttons/iconButtons/DeleteIconBtn";
import CopyIconBtn from "./buttons/iconButtons/CopyIconBtn";
import Tooltip from "./utils/Tooltip";
import { toast } from "sonner";
import deleteLinkService from "../infra/services/deleteLink.service";
import { useAuth } from "../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys.utils";
import Dialog from "./modals/Dialog";
import { useRef } from "react";
import DeleteModal from "./modals/DeleteModal";

interface Props {
  link: Link;
}

function LinkCard({ link }: Props) {
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.shortened_url!);
    toast.success("Copied!");
  };

  const handleDeleteLink = async () => {
    const res = await deleteLinkService({ userId: user?.id!, linkId: link.id });
    if (res) {
      toast.success("Deleted");
      deleteModalRef?.current!.close();
      queryClient.invalidateQueries({ queryKey: queryKeys.links.userLinks });
    }
  };

  const showModal = () => {
    deleteModalRef?.current!.showModal();
  };

  const hideModal = () => {
    deleteModalRef.current?.close();
  };
  console.log(typeof link.createdAt);
  return (
    <li
      className="flex flex-col bg-neutral-800 rounded-md border border-neutral-400 py-4 px-8 gap-2"
      key={link.shortened_url}
    >
      <Dialog dialogRef={deleteModalRef}>
        <DeleteModal
          hideModal={hideModal}
          handleDeleteLink={handleDeleteLink}
        />
      </Dialog>

      <div className="flex flex-col sm:flex-row justify-between md:items-center">
        <a
          href={link.shortened_url}
          target="_blank"
          referrerPolicy="no-referrer"
          className="text-lg tracking-wide "
        >
          / <strong>{`${link.shortened_url?.slice(-5)}`}</strong>
        </a>

        <section className="flex gap-2 mt-2 sm:mt-0">
          <Tooltip message="Click count">
            <div className="flex gap-2 items-center mr-2">
              <ClickCountIcon />
              <p>{link.clicked}</p>
            </div>
          </Tooltip>
          <Tooltip message="Copy shortened link!">
            <CopyIconBtn onClickFn={handleCopyLink} />
          </Tooltip>
          <Tooltip message="Edit link settings">
            <ToolIconBtn onClickFn={() => {}} />
          </Tooltip>
          <Tooltip message="Delete link!">
            <DeleteIconBtn onClickFn={showModal} />
          </Tooltip>
        </section>
      </div>
      <a
        className="text-neutral-300 text-ellipsis max-w-[50ch] whitespace-nowrap overflow-hidden block text-sm"
        referrerPolicy="no-referrer"
        target="_blank"
        href={link.original_url}
      >
        {link.original_url}
      </a>
      <p>{link.description ? link.description : "No description"}</p>
      <div className="flex gap-4 my-2">
        {link.tags &&
          link.tags.map((tag) => {
            if (tag == "") return;
            return (
              <p
                key={tag}
                className="p-2 bg-neutral-300 text-md rounded-lg text-black font-medium"
              >
                {tag}
              </p>
            );
          })}
      </div>
      <div className="flex justify-between gap-2">
        <p className="text-neutral-400">
          Created at:{" "}
          <strong className="text-neutral-300">
            {link.createdAt.slice(0, 10)}
          </strong>
        </p>
        <p className="text-neutral-400">
          Expires at:{" "}
          <strong className="text-neutral-300">
            {link.expiresAt.slice(0, 10)}
          </strong>
        </p>
      </div>
    </li>
  );
}

export default LinkCard;
