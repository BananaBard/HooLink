import { supabase } from "../infra/supabase";

const base_url = 'http://localhost:5173/'/* import.meta.env.VITE_BASE_URL */;

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

    try {
      await supabase
        .from("links")
        .update({ clicked: res.data.clicked + 1 })
        .eq("shortened_url", fullUrl);
    } catch (error) {
      throw new Error("Can not update");
    }
    window.location.replace(res.data.original_url)
  } catch (err) {
    throw err;
  }
};
export default redirectLinkService;
