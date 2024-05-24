import { Schema } from "mongoose";

const linkSchema = new Schema({
    original_link: {
        type: String,
        required: true
    },
    link_key: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

export default linkSchema;
