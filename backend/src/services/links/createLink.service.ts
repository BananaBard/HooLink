import { supabase } from "../../infra/supabase";
const xid = require('xid-js');


const createLinkService = async (originalURL: string, expTimeInMinutes: number) => {
    const base_url = process.env.DEV_URL
    
    let checkForDuplicatedKeys: Boolean = true;
    let newKey: string = xid.next().slice(-4);

    while(checkForDuplicatedKeys) {
        let supabaseRes;
        try {
            supabaseRes = await supabase.from('links').select().eq('shortened_url', newKey);
        } catch(error) {
            throw new Error('Supabase Error.');
        }

        if (supabaseRes.status === 200) {
            newKey = xid.next().slice(-4);
        } else {
            checkForDuplicatedKeys = false;
        }

        try {
            const now = new Date()
            const res = await supabase.from('links').insert({
                original_url: originalURL,
                shortened_url: base_url + newKey,
                expiresAt: new Date(now.getTime() + expTimeInMinutes * 60 * 60 * 1000),
                /* add creator when login is setted */
            });

            if (res.status === 201) {
                const newLink = await supabase.from('links').select().eq('shortened_url', base_url+newKey)
                return newLink.data?.[0];
            }

        } catch(error) {
            throw new Error('Supabase Error.');
        }
    }
}

export default createLinkService;