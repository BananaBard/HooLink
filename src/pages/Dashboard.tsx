import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import LinkCard from "../components/LinkCard";
import getUserLinks from "../queries/getUserLinks";
import { queryKeys } from "../utils/queryKeys.utils";
import StackIcon from "../components/icons/Stack.icon";
import Tooltip from "../components/utils/Tooltip";
import { CreateLinkModal } from "../components/CreateLinkModal";
import { Link } from "../types";

const MINUTE_IN_MS = 60 * 1000;

function useLinks(id: string) {
  return useQuery({
    queryFn: () => getUserLinks(id),
    queryKey: queryKeys.links.userLinks,
    staleTime: MINUTE_IN_MS * 5,
  });
}

function Dashboard() {
  const { user } = useAuth();
  const { data: userLinks } = useLinks(user?.id!);

  return (
    <div className="flex flex-col flex-grow p-12 lg:px-14 lg:py-12 gap-8 bg-neutral-900 text-neutral-200">
      <section className="flex mx-auto justify-between max-w-7xl w-full">
        <input
          type="search"
          className="bg-neutral-800 border border-neutral-400 rounded-lg min-w-56"
        />
        <div className="flex gap-2">
          <div className="flex gap-2 items-center bg-neutral-800 border border-neutral-400 w-fit p-2 rounded-lg">
            <Tooltip message="Your stored links, max of 20.">
              <StackIcon />
            </Tooltip>
            <p className="text-md tracking-wide">
              {userLinks && `${userLinks.length || "0"}/20`}
            </p>
          </div>
          <CreateLinkModal isCTA={false} />
        </div>
      </section>
      {userLinks?.length! > 0 ? (
        <ul className="lg:mx-auto grid max-w-4 lg:max-w-7xl lg:grid-cols-3 gap-8">
          {userLinks?.map((link: Link) => (
            <LinkCard key={link.shortened_url} link={link} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-4 mx-auto max-w-7xl w-full">
          <p>You dont have any links</p>
          <CreateLinkModal isCTA={true} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;