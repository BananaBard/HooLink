import { type Link } from "../types";
import LinkCard from "./LinkCard";

interface Props {
  userLinks: Link[];
}

export default function LinkTable({ userLinks }: Props) {
  return (
    <>
      {userLinks?.length! > 0 ? (
        <ul className="lg:mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:w-full lg:max-w-7xl">
          {userLinks?.map((link: Link) => (
            <LinkCard key={link.shortened_url} link={link} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-4 mx-auto max-w-7xl w-full">
          <p>You dont have any links</p>
        </div>
      )}
    </>
  );
}
