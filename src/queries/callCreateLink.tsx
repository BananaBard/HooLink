import { toast } from "sonner";
import { type Link } from "../types";
import createLinkService from "../infra/services/createLink.service";

interface CreateLinkProps {
    url: string,
    expiresAt: number,
    id: string
}

const callCreateLink = async ({url, expiresAt, id}:CreateLinkProps) :Promise<Link> => {
    try {
        const res = await createLinkService({originalURL: url, expTimeInMinutes: expiresAt, creator: id})
        console.log({res})
        toast.success('Link created!')
        return res

    } catch(error) {
        toast.error('Your link could not been created.');
        throw new Error('Something went wrong');
    }
}

export default callCreateLink