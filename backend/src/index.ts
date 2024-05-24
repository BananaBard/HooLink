import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
const cors = require('cors');
import linkRoutes from "./routes/link.routes";

const URI: string = process.env.MONGO_DB_URI!
const app = express();

async function start(){
    try {
        await mongoose.connect(URI);
        console.log('Connected to DB...');

        app.use(express.json());
        app.use(express.urlencoded());
        app.use(cors());

        app.use(linkRoutes);

        app.listen(3000, function() {
            console.log('App listening in port 3000')
        });

    } catch(error) {
        console.log(error);
    }
}

start();