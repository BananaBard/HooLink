import { NextFunction, Request, Response } from "express";
import createLinkService from "../../services/links/createLink.service";

const createLink = async(req: Request, res: Response, next: NextFunction) => {
    const originalURL: string = req.body.original_url;
    const baseUrl: string = 'http://localhost:3000';

    try {
        new URL(originalURL);
    } catch(err) {
        /*agregar Status*/
        const error = new Error('Invalidad Original URL');
        return next(error);
    }

    try {
        const newLink = await createLinkService(originalURL);
        const linkObj = newLink?.toJSON();

        res.status(200).json({
            shortened_url: `${baseUrl}${linkObj?.link_key}`,
            original_url: linkObj?.original_link
        });
    } catch(error) {
        next(error);
    }
}

export default createLink