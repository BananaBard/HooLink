import { Link } from "../types";
import ToolIconBtn from "./buttons/iconButtons/ToolIconBtn";
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
  const deleteModalRef = useRef<HTMLDialogElement | null>(null)
  const {user} = useAuth();
  const queryClient = useQueryClient();


  const handleCopyLink = () => {
    navigator.clipboard.writeText(link.shortened_url!);
    toast.success('Copied!')
  }

  const handleDeleteLink = async() => {
    const res = await deleteLinkService({userId: user?.id!, linkId: link.id})
    if (res) {
      toast.success('Deleted')
      queryClient.invalidateQueries({ queryKey: queryKeys.links.userLinks })
    }
  }

  const showModal = () => {
    deleteModalRef?.current!.showModal();
  };

  const hideModal = () => {
    deleteModalRef.current?.close();
  };

  return (
    <li
      className="flex flex-col bg-neutral-800 rounded-md border border-neutral-400 py-4 px-8"
      key={link.shortened_url}
    >
      <Dialog dialogRef={deleteModalRef}>
        <DeleteModal hideModal={hideModal} handleDeleteLink={handleDeleteLink}/>
      </Dialog>

      <div className="flex justify-between items-center mb-2">
        <a href={link.shortened_url} target="_blank" referrerPolicy="no-referrer" className="text-lg tracking-wide ">/ <strong>{`${link.shortened_url?.slice(-5)}`}</strong></a>

        <div className="flex gap-3">
            <Tooltip message="Copy shortened link!">
              <CopyIconBtn onClickFn={handleCopyLink}/>
            </Tooltip>
            <Tooltip message="Edit link settings">
              <ToolIconBtn onClickFn={() => {}}/>
            </Tooltip>
            <Tooltip message="Delete link!">
              <DeleteIconBtn onClickFn={showModal}/>
            </Tooltip>
        </div>
      </div>
      <div>
        <a
          className="text-neutral-300 text-wrap max-w-full whitespace-nowrap overflow-hidden block"
          referrerPolicy="no-referrer"
          target="_blank"
          href={link.original_url}
        >
          {link.original_url}
        </a>
      </div>
    </li>
  );
}

export default LinkCard;

