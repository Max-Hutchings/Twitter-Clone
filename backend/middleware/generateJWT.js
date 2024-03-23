import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });

const expireTime = 60 * 60 * 24 * 10;
const secret = process.env.JWT_SECRET;

function generateJWT(userId) {
    try {

        // console.log(secret)
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not set");
        }

        const token = jwt.sign(
            {"userId": userId},
            secret,
            {expiresIn: expireTime}
        )
        // console.log("Successfully created token")
        return token;
    } catch (e) {
        console.log(e);
    }
}


export default generateJWT;