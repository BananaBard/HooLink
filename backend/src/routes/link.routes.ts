import { Router } from "express";
import redirectLink from "../controllers/links/redirectLink.controller";
import createLink from "../controllers/links/createLink.controller";

const linkRoutes = Router();

linkRoutes.get('/:id', redirectLink);
linkRoutes.post('/', createLink);

export default linkRoutes