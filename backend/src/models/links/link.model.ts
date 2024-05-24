import { Schema, model } from "mongoose";

interface Link extends Document {
    link_key: string;
    original_link: string;
    createdAt: Date;
}

const linkSchema = new Schema({
    link_key: { type: String, required: true },
    original_link: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

const LinkModel = model<Link>('Link', linkSchema);

export default LinkModel;
