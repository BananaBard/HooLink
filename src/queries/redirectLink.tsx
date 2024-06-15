import { supabase } from "../infra/supabase";

const base_url = import.meta.env.VITE_BASE_URL;

const redirectLinkService = async (id: string): Promise<void> => {
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

    let expDate = new Date(res.data.expiresAt);
    let now = new Date();
    let linkId = res.data.id;

    if (now > expDate) {
      let deleteRes = await supabase.from("links").delete().eq("id", linkId);

      if (deleteRes.status === 204) {
        throw new Error("The link expired");
      }
    }

    await incrementClickCount(linkId)
    window.location.replace(res.data.original_url)
  } catch (err) {
    throw err;
  }
};

async function incrementClickCount(linkId: string) {
  const { error } = await supabase.rpc("increment_click_count", {
    link_id: linkId,
  });
  if (error) {
    console.error("Error incrementing click count:", error);
  }
}

export default redirectLinkService;
