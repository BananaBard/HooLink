import { model } from "mongoose";
import linkSchema from "./link.schema";

const LinkModel = model('Link', linkSchema);

export default LinkModel