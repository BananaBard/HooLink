import { supabase } from "../supabase"
import { v4 as uuidv4 } from 'uuid';
import { CreateLink } from "../../types";
const base_url: string = import.meta.env.VITE_BASE_URL

const createLinkService = async({originalURL, expTimeInMinutes, creator, description}: CreateLink) => {
    let newKey: string = uuidv4().slice(-5)

    const existShortURL = await supabase
    .from("links")
    .select()
    .eq("shortened_url", base_url + newKey);
  if (existShortURL.data) {
    newKey = uuidv4().slice(-5)
  }
  try {
    const now = new Date();
    const res = await supabase.from("links").insert({
      original_url: originalURL,
      shortened_url: base_url + newKey,
      expiresAt: new Date(now.getTime() + expTimeInMinutes * 60 * 60 * 1000),
      description: description,
      creator: creator
    });
    if (res.status === 201) {
      const newLink = await supabase
        .from("links")
        .select()
        .eq("shortened_url", base_url + newKey);
      return newLink.data?.[0];
    }
  } catch (error) {
    throw new Error("Could not create link, try again later...");
  }
}

export default createLinkService