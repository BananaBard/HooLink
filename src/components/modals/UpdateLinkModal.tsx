import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLinkContext } from "../../context/LinksContext";
import Dialog from "./Dialog";
import ToolIconBtn from "../buttons/iconButtons/ToolIconBtn";
import Tooltip from "../utils/Tooltip";
import { Button } from "../buttons/Button";
import { checkDescription, checkValidTags } from "../../utils/links.utils";

interface Props {
  linkId: string;
}

function UpdateLinkModal({ linkId }: Props) {
  const { user } = useAuth();
  const { updateLink, isUpdatingLink } = useLinkContext();
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const updateModalRef = useRef<HTMLDialogElement | null>(null);
  let tagsArr: Array<string> = [""];

  const showUpdateModal = () => {
    updateModalRef?.current!.showModal();
  };

  const hideUpdateModal = () => {
    updateModalRef.current?.close();
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (checkDescription(description, 140) === false) return;

    if (checkValidTags(tags, tagsArr) === false) return;

    updateLink(user?.id!, linkId, description, tagsArr, updateModalRef);
  };

  return (
    <div>
      <Tooltip message="Edit link">
        <ToolIconBtn onClickFn={() => showUpdateModal()} />
      </Tooltip>
      <Dialog dialogRef={updateModalRef}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Use this field to change this link description!"
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
              placeholder="Im, a new, tag!"
              onChange={(e) => setTags(e.target.value)}
            />
            <span className="text-sm text-neutral-300">
              Tags must be separated by comma "," and the maximum amount is 3
              per link.
            </span>
          </fieldset>
          <div className="flex flex-row gap-8 justify-between">
            <button
              className="py-2 px-6 rounded-lg border-2 border-neutral-500"
              onClick={hideUpdateModal}
            >
              Cancel
            </button>
            <Button
              disabled={isUpdatingLink}
              type="submit"
              className="bg-blue-800/60 border border-blue-800 hover:border-transparent hover:bg-blue-800 transition-all"
            >
              Update
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default UpdateLinkModal;
