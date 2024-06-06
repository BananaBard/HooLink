import { supabase } from "../supabase";

interface DeleteLink {
    userId: string,
    linkId: string
}

const deleteLinkService = async({userId, linkId }:DeleteLink) => {
    try {
        console.log({linkId})
        const res = await supabase.from('links').delete().match({'id': linkId, 'creator': userId})
        console.log(res)
        return res
    } catch(error) {
        throw new Error('Could not delete')
    }
}

export default deleteLinkService