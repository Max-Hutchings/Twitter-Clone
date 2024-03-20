import express from "express";
import PeepComment from "../model/peepComment.model.js";
import {check, validationResult} from "express-validator";
import getIDFromJWT from "../validators/getIDFromJWT.js";


export const router = express.Router();

router.route("/:peepId").get(
    async(request, response) => {
        try{
            const peepId = request.params.peepId;
            const comments = await PeepComment.find({"peepId": peepId })
                .populate('accountId', 'username');
            return response.status(200).json({
                "message": `Successfully gathered comments for peep ${peepId}`,
                "data": comments
            })

        }catch(e){
            console.log(e);
            return response.status(500).json({
                "message": "Cannot find the requested comments",
                "error": e.message
            })
        }
    }
)


router.route("/add-peep-comment").post(
    [
        check("commentText").notEmpty(),
        check("peepId").notEmpty(),
        check("accountId").notEmpty()
    ],
    async(request, response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) return response.status(401).json({"message": "Failed to provide required fields"});

        try {
            const userId = await getIDFromJWT(request.cookies.token)

            if (!userId) return response.status(401).json({"message": "Invalid token"});

            const peepComment = new PeepComment({
                "peepId": request.body.peepId,
                "commentText": request.body.commentText,
                "accountId": request.body.accountId
            });
            await peepComment.save();

            return response.status(200).json({"message": "Successfully saved peep comment"})

        }catch(e){
            console.log(e.message);
            return response.status(400).json({
                "message": "Failed to save peep comment",
                "error": e.message
            })
        }



    }
)