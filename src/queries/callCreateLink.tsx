import { toast } from "sonner";
import { type Link, type CreateLink } from "../types";
import createLinkService from "../infra/services/createLink.service";


const callCreateLink = async ({originalURL, expTimeInMinutes, creator, description}:CreateLink) :Promise<Link> => {
    try {
        new URL(originalURL)
    } catch(error) {
        toast.error('Use a valid URL.');
        throw new Error('Invalid URL.')
    }
    try {
        const res = await createLinkService({originalURL, expTimeInMinutes, creator, description})
        toast.success('Link created!')
        return res

    } catch(error) {
        toast.error('Your link could not been created.');
        throw new Error('Something went wrong');
    }
}

export default callCreateLink