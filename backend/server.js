import dotenv from 'dotenv'
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';

import {router as authentication} from "./controller/authentication.js";
import {router as peep} from "./controller/peep.js";
import {router as peepComment} from "./controller/peepComment.js";
import authenticateJWT from "./validators/verifyJWT.js";


dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const dbURI = process.env.DB_URI;
console.log(dbURI);
console.log("starting server");


const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,

}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// Base endpoints
app.use("/authentication", authentication)
app.use("/peep", peep)
app.use("/peep-comment", peepComment)



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