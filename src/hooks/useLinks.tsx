import { useQuery } from "@tanstack/react-query";
import getUserLinks from "../queries/getUserLinks";
import { queryKeys } from "../utils/queryKeys.utils";

const MINUTE_IN_MS = 60 * 1000;

export default function useLinks(
    id: string,
    shouldSort: boolean = false,
    sortMethod: string = "createAt",
    isAscending: boolean = true
  ) {
    return useQuery({
      queryFn: () => getUserLinks(id, shouldSort, sortMethod, isAscending),
      queryKey: [
        queryKeys.links.userLinks,
        shouldSort,
        sortMethod,
        isAscending,
      ],
      staleTime: MINUTE_IN_MS * 5,
    });
  }