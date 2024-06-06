import { supabase } from "../supabase"

const getUserLinksService = async(userId: string) => {
    
    try {
    const res = await supabase
    .from("links")
    .select()
    .eq('creator', userId)

    if (res.status === 200) {
        return res.data
    }
    } catch(error) {
        throw new Error('No links found')
    }
}

export default getUserLinksService