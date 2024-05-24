import LinkModel from "../../models/links/link.model";
const xid = require('xid-js');

const createLinkService = async (originalURL: string) => {
    
    const keyLength: number = 8;
    let checkForDuplicatedKeys: Boolean = true;
    let newKey: string = xid.next();

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
            newKey = xid.next();
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