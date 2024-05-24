import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import LinkModel from "./models/links/link.model";

const URI: string = process.env.MONGO_DB_URI!
const app = express();

async function start(){
    try {
        await mongoose.connect(URI);
        console.log('Connected to DB...');
        app.use(express.json());
        app.use(express.urlencoded());

        app.use('/', async (req, res) => {
            const newLink = await LinkModel.create({
                original_link: "https://mongoosejs.com/docs/guide.html",
                link_key: "newlink",
            })
            res.status(200).json({
                body: newLink
            })
        });

        app.listen(3000, function() {
            console.log('App listening in port 3000')
        });
    } catch(error) {
        console.log(error);
    }
}

start();