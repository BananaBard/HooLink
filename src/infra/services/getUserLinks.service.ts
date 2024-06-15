import { supabase } from "../supabase";

const getUserLinksService = async (
  userId: string,
  shouldSort: boolean = false,
  sortMethod: string = "createdAt",
  isAscending: boolean = true
) => {
  try {
    let query = supabase.from("links").select().eq("creator", userId);

    if (shouldSort) {
      query.order(sortMethod, { ascending: isAscending });
    }

    const res = await query;

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    throw new Error("No links found");
  }
};

export default getUserLinksService;
