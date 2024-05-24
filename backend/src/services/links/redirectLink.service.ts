import { Document } from "mongoose";
import LinkModel from "../../models/links/link.model";

type Link = {
    link_key: string,
    original_link: string,
    createdAt: Date
}

interface LinkDocument extends Document, Link {}

const redirectLinkService = async (id: string): Promise<Link> => {
    try {
        const link = await LinkModel.findOne({link_key: id}) as LinkDocument
        
        if(!link) {
            throw new Error('Link not found.');
        }

        return link.toJSON() as Link;

    } catch(err) {
        throw err
    }
}

export default redirectLinkService
export {Link}