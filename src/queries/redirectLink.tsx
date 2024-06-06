import { supabase } from "../infra/supabase";
import { Link } from "../types";

const base_url = process.env.DEV_URL;

const redirectLinkService = async (id: string): Promise<Link> => {
  const fullUrl = `${base_url}${id}`;
  try {
    const res = await supabase
      .from("links")
      .select()
      .eq("shortened_url", fullUrl)
      .single();

    if (res.status !== 200) {
      throw new Error(String(res.error));
    }

    try {
        await supabase.from("links").update({clicked: (res.data.clicked + 1)}).eq("shortened_url", fullUrl)
    } catch(error) {
        throw new Error('Can not update');
    }


    let expDate = new Date(res.data.expiresAt);
    let now = new Date();
    let linkId = res.data.id;

    if (now > expDate) {
      let deleteRes = await supabase.from("links").delete().eq("id", linkId);

      if (deleteRes.status === 204) {
        throw new Error("The link expired");
      }
    }

    return res.data as Link;
  } catch (err) {
    throw err;
  }
};