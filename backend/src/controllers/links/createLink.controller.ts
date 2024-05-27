import { NextFunction, Request, Response } from "express";
import createLinkService from "../../services/links/createLink.service";

const createLink = async(req: Request, res: Response, next: NextFunction) => {
    const originalURL: string = req.body.original_url;
    const expiresAt: number = req.body.expiresAt;

    try {
        new URL(originalURL);
    } catch(err) {
        /*agregar Status*/
        const error = new Error('Invalidad Original URL');
        return next(error);
    }

    try {
        const newLink = await createLinkService(originalURL, expiresAt);
        const linkObj = newLink;

        res.status(200).json(linkObj);
    } catch(error) {
        next(error);
    }
}

export default createLink