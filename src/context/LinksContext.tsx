import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CreateLink, Link } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../utils/queryKeys.utils";
import useLinks from "../hooks/useLinks";
import callCreateLink from "../queries/callCreateLink";
import callDeleteLink from "../queries/callDeleteLink";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface LinksContext {
  createLink: (
    linkData: CreateLink,
    dialogRef: RefObject<HTMLDialogElement | null>
  ) => Promise<Link>;
  //updateLink: (id: number, linkData: CreateLink) => Promise<Link>;
  deleteLink: (userId: string, linkId: string, dialogRef: RefObject<HTMLDialogElement | null>) => Promise<PostgrestSingleResponse<null>>;
  userLinks: Link[] | undefined;
  shouldSort: boolean;
  sortMethod: string;
  isAscending: boolean;
  setShouldSort: Dispatch<SetStateAction<boolean>>;
  setSortMethod: Dispatch<SetStateAction<string>>;
  setIsAscending: Dispatch<SetStateAction<boolean>>;
  isCreatingLink: boolean;
  //isUpdatingLink: boolean;
  isDeletingLink: boolean;
  isFetchingLinks: boolean;
}

const linksContext = createContext<LinksContext>({
  createLink: async () => {
    throw new Error("createLink not implemented");
  },
  //updateLink: async (id: number, linkData: CreateLink) => { throw new Error("updateLink not implemented"); },
  deleteLink: async () => { throw new Error("deleteLink not implemented"); },
  userLinks: [],
  setShouldSort: () => false,
  setSortMethod: () => "",
  setIsAscending: () => false,
  shouldSort: false,
  sortMethod: "createdAt",
  isAscending: false,
  isCreatingLink: false,
  //isUpdatingLink: false,
  isDeletingLink: false,
  isFetchingLinks: false,
});

function LinksProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const [sortMethod, setSortMethod] = useState<string>("");
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const createLinkMutation = useMutation({
    mutationFn: callCreateLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.links.userLinks, shouldSort, sortMethod, isAscending],
      });
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: callDeleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.links.userLinks, shouldSort, sortMethod, isAscending],
      });
    },
  })

  const createLink = useCallback(
    async (linkData: CreateLink, dialogRef: RefObject<HTMLDialogElement | null>) => {
      try {
        const newLink = await createLinkMutation.mutateAsync(linkData);
        dialogRef?.current?.close();
        return newLink;
      } catch (error) {
        console.error("Error creating link:", error);
        throw new Error("Failed to create link");
      }
    },
    [createLinkMutation]
  );


  const deleteLink = useCallback(
    async (userId: string, linkId: string, dialogRef: RefObject<HTMLDialogElement | null>) => {
      try {
        const res = await deleteLinkMutation.mutateAsync({userId, linkId})
        dialogRef?.current?.close();
        return res
      } catch(error) {
        console.error("Error deleting link:", error);
        throw new Error("Failed to delete link");
      }
    },
    [deleteLinkMutation]
  )

  const { data: userLinks, isLoading: isLoadingLinks } = useLinks(
    shouldSort,
    sortMethod,
    isAscending
  );

  const value = useMemo(
    () => ({
      createLink,
      userLinks: userLinks,
      deleteLink,
      setShouldSort,
      setSortMethod,
      setIsAscending,
      shouldSort,
      sortMethod,
      isAscending,
      isCreatingLink: createLinkMutation.isPending,
      isFetchingLinks: isLoadingLinks,
      isDeletingLink: deleteLinkMutation.isPending
    }),
    [createLink, setShouldSort, setSortMethod, setIsAscending, userLinks]
  );

  return (
    <linksContext.Provider value={value}>{children}</linksContext.Provider>
  );
}
export const useLinkContext = () => {
  return useContext(linksContext);
};

export default LinksProvider;