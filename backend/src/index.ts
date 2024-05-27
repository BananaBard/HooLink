require('dotenv').config({ path: '../.env' })
import express from "express";
const cors = require('cors');
import linkRoutes from "./routes/link.routes";

const app = express();

async function start(){
    try {
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