import { useRef } from "react";
import { Button } from "../buttons/Button";
import DeleteIconBtn from "../buttons/iconButtons/DeleteIconBtn";
import Dialog from "./Dialog";
import { useAuth } from "../../context/AuthContext";
import { useLinkContext } from "../../context/LinksContext";

interface Props {
    linkId: string
}

function DeleteLinkModal({linkId}: Props) {
  const { user } = useAuth();
  const { deleteLink, isDeletingLink } = useLinkContext();
  const deleteModalRef = useRef<HTMLDialogElement | null>(null);

  const showDeleteModal = () => {
    deleteModalRef?.current!.showModal();
  };

  const hideDeleteModal = () => {
    deleteModalRef.current?.close();
  };

  return (
    <div>
      <DeleteIconBtn onClickFn={showDeleteModal} />
      <Dialog dialogRef={deleteModalRef}>
        <div className="flex flex-col gap-4">
          <div>
            <p>Deleting this links will remove it permanently.</p>
            <p>This action can not be undone.</p>
          </div>
          <div className="flex flex-row gap-8 justify-between">
            <button
              className="py-2 px-6 rounded-lg border-2 border-neutral-500"
              onClick={hideDeleteModal}
            >
              Cancel
            </button>
            <Button
              disabled={isDeletingLink}
              className="bg-red-800/60 border border-red-800 hover:border-transparent hover:bg-red-800 transition-all"
              onClick={() => deleteLink(user?.id!, linkId, deleteModalRef)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteLinkModal;
