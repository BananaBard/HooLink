import { Link } from "../types";
import ToolIconBtn from "./buttons/iconButtons/ToolIconBtn";
import ClickCountIcon from "./icons/ClickCountIcon";
import CopyIconBtn from "./buttons/iconButtons/CopyIconBtn";
import Tooltip from "./utils/Tooltip";
import DeleteLinkModal from "./modals/DeleteLinkModal";
import { handleCopyLink } from "../utils/links.utils";

interface Props {
  link: Link;
}

function LinkCard({ link }: Props) {
  return (
    <li
      className="flex flex-col bg-neutral-800 rounded-md border border-neutral-400 py-4 px-8 gap-2"
      key={link.shortened_url}
    >
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
            <CopyIconBtn
              onClickFn={() => handleCopyLink(link.shortened_url!)}
            />
          </Tooltip>
          <Tooltip message="Edit link settings">
            <ToolIconBtn onClickFn={() => {}} />
          </Tooltip>
          <DeleteLinkModal linkId={link.id} />
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
