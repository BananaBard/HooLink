import { supabase } from "../supabase";
import { Link } from "../../types";



const updateLinkService = async({creator, id, description, tags}: Pick<Link,'id' | 'description' | 'tags' | 'creator'>) => {
    try {
        const res = await supabase.from('links').update({description: description, tags: tags}).match({'id': id, 'creator': creator})
        return res
    } catch(error) {
        throw new Error('Could not update link')
    }
}

export default updateLinkService