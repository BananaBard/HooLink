import { useAuth } from "../context/AuthContext";
import StackIcon from "../components/icons/Stack.icon";
import Tooltip from "../components/utils/Tooltip";
import { CreateLinkModal } from "../components/modals/CreateLinkModal";
import IconButton from "../components/buttons/iconButtons/IconButton";
import SortAscLettersIcon from "../components/icons/SortAscLetter";
import SortDesLetterIcon from "../components/icons/SortDesLetter";
import SortRecentIcon from "../components/icons/SortRecentIcon";
import SortOlderIcon from "../components/icons/SortOlderIcon";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import useLinks from "../hooks/useLinks";
import Loader from "../components/utils/Loader";
import LinkTable from "../components/LinkTable";
import RefreshIcon from "../components/icons/RefreshIcon";

function Dashboard() {
  const { user } = useAuth();
  const [shouldSort, setShouldSort] = useState(false);
  const [sortMethod, setSortMethod] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  const { data: userLinks, isLoading } = useLinks(
    user?.id!,
    shouldSort,
    sortMethod,
    isAscending
  );

  useTitle("Dashboard - HooLink");

  const handleSort = (method: string, ascending: boolean) => {
    setShouldSort(true);
    setSortMethod(method);
    setIsAscending(ascending);
  };

  const handleNoSort = () => {
    setShouldSort(false);
  };

  return (
    <div className="flex flex-col flex-grow p-4 md:px-14 md:py-12 gap-8 bg-neutral-900 text-neutral-200">
      <section className="flex flex-col lg:flex-row lg:items-center mx-auto justify-between gap-4 max-w-7xl w-full">
        <div className="flex gap-2 flex-col md:flex-row">
          <IconButton
            onClick={() => handleSort("tags", false)}
            icon={<SortAscLettersIcon />}
          >
            Letter Ascending
          </IconButton>
          <IconButton
            onClick={() => handleSort("tags", true)}
            icon={<SortDesLetterIcon />}
          >
            Letter Descending
          </IconButton>
          <IconButton
            onClick={() => handleSort("createdAt", false)}
            icon={<SortRecentIcon />}
          >
            Recent
          </IconButton>
          <IconButton
            onClick={() => handleSort("createdAt", true)}
            icon={<SortOlderIcon />}
          >
            Older
          </IconButton>
          <IconButton onClick={() => handleNoSort()} icon={<RefreshIcon />} />
        </div>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 items-center bg-neutral-800 border border-neutral-400 w-fit p-2 rounded-lg">
            <Tooltip message="Your stored links, max of 20.">
              <StackIcon />
            </Tooltip>
            <p className="text-md">
              {userLinks && `${userLinks.length || "0"} / 20`}
            </p>
          </div>
          <CreateLinkModal
            isCTA={false}
            shouldSort={shouldSort}
            sortMethod={sortMethod}
            isAscending={isAscending}
            userLinks={userLinks}
          />
        </div>
      </section>
      {isLoading ? <Loader /> : <LinkTable userLinks={userLinks!} />}
    </div>
  );
}

export default Dashboard;
