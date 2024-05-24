import { nanoid } from "nanoid";
import LinkModel from "../../models/links/link.model";

const createLinkService = async (originalURL: string) => {
    const keyLength: number = 8;
    let checkForDuplicatedKeys: Boolean = true;
    let newKey: string = nanoid(keyLength);

    while(checkForDuplicatedKeys) {
        let linkFoundWithKey;
        try {
            linkFoundWithKey = await LinkModel.findOne({link_key: newKey});
        } catch(error) {
            throw new Error('MongoDB Error.');
        }

        if (!linkFoundWithKey) {
            checkForDuplicatedKeys = false;
        } else {
            newKey = nanoid(keyLength);
        }
        
        try {
            const newLink = await LinkModel.create({
                original_link: originalURL,
                link_key: newKey,
            });

            return newLink;

        } catch(error) {
            throw new Error('MongoDB Error.');
        }
    }
}

export default createLinkService;