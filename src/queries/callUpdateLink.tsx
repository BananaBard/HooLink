import { toast } from "sonner";
import updateLinkService from "../infra/services/updateLink.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface UpdateLink {
  creator: string;
  id: string;
  description: string;
  tags: string[];
}

const callUpdateLink = async ({creator, id, description, tags }: UpdateLink):Promise<PostgrestSingleResponse<null>> => {
  try {
    const res = await updateLinkService({ creator, id, description, tags });
    toast.success("Link updated", {
      description: "Your link was successfully updated!",
    });
    return res;
  } catch (error) {
    toast.error("Something went wrong...", {
      description: "Could not update your link.",
    });
    throw new Error('Something went wrong')
  }
};

export default callUpdateLink