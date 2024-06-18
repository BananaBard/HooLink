import { toast } from "sonner";
import deleteLinkService from "../infra/services/deleteLink.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface DeleteLink {
  userId: string;
  linkId: string;
}

const callDeleteLink = async ({
  userId,
  linkId,
}: DeleteLink): Promise<PostgrestSingleResponse<null>> => {
  try {
    const res = await deleteLinkService({ userId, linkId });
    toast.success("Deleted", {
      description: "The link was deleted, this action can not be undone.",
    });
    return res;
  } catch (error) {
    toast.error("Could not delete link", {
      description: "Something went wrong",
    });
    throw new Error("Could not delete link, something went wrong");
  }
};

export default callDeleteLink;
