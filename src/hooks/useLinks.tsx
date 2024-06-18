import { useQuery } from "@tanstack/react-query";
import getUserLinks from "../queries/getUserLinks";
import { queryKeys } from "../utils/queryKeys.utils";
import { useAuth } from "../context/AuthContext";

const MINUTE_IN_MS = 60 * 1000;

export default function useLinks(
    shouldSort: boolean = false,
    sortMethod: string = "createAt",
    isAscending: boolean = true
  ) {
    const {user} = useAuth()
    return useQuery({
      queryFn: async () => {
        if(!user) {
          throw new Error('No user in request')
        }
        return getUserLinks(user?.id!, shouldSort, sortMethod, isAscending)
      },
      queryKey: [
        queryKeys.links.userLinks,
        shouldSort,
        sortMethod,
        isAscending,
      ],
      staleTime: MINUTE_IN_MS * 5,
    });
  }