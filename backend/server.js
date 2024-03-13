import dotenv from 'dotenv'
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import {router as authentication} from "./controller/authentication.js";
import authenticateJWT from "./validators/verifyJWT.js";


dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const dbURI = process.env.DB_URI;
console.log(dbURI);
console.log("starting server");


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Base endpoints
app.use("/authentication", authentication)



// Connect to db


const main = async () => {
    console.log(`Connecting to: ${dbURI}`)
    await mongoose.connect(dbURI);
}

try {
    main();
    console.log("Connected to database");
} catch (e) {
    console.log(e);
}


const server = app.listen(port, () => {

    // Place server host and port for production

    console.log(`Server running on port: ${port}`)
})


export default server