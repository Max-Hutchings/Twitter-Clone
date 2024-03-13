import express from "express";
import Peep from "../model/peep.model.js";
import authenticateJWT from "../validators/verifyJWT.js";
import {check, validationResult} from "express-validator";
import getIDFromJWT from "../validators/getIDFromJWT.js";


export const router = express.Router();

router.route("/all-peeps").get(
    async(request, response) => {
        try{
            const allPeeps = await Peep.find().sort({ createdDate: -1 })
                .populate("accountId", "username");
            return response.status(200).json({
                "message": "Successfully gathered peeps",
                "data": allPeeps});
        }catch(e){
            return response.status(400).json({
                "message": "Failed to get peeps",
                "errors": e.message})
        }
    }
)

router.route("/add-peep").post(
    authenticateJWT,
    [
        check("textContent").notEmpty()
    ],
    async (request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(401).json({"message": "Failed to provide text content"});

        try {
            const userId = await getIDFromJWT(request.cookies.token);

            if (!userId) return response.status(401).json({"message": "Invalid token"});

            const newPeep = new Peep({
                "accountId": userId,
                "textContent": request.body.textContent
            })

            await newPeep.save();

            return response.status(200).json({"message": "Peep successfully saved"});
        }catch(e){
            console.log(e);
            return response.status(404).json({"message": "Failed to save peep", "error": e.message});

        }
    }
)