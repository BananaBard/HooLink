import { supabase } from "../supabase";

interface DeleteLink {
    userId: string,
    linkId: string
}

const deleteLinkService = async({userId, linkId }:DeleteLink) => {
    try {
        const res = await supabase.from('links').delete().match({'id': linkId, 'creator': userId})
        return res
    } catch(error) {
        throw new Error('Could not delete')
    }
}

export default deleteLinkService