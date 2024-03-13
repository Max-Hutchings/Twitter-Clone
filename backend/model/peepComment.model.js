import mongoose, {Schema} from "mongoose";


const peepCommentSchema = new Schema({
    "peepId": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No peep found"],
        ref: "Peep"
    },

    "commentText": {
        type: String,
        required: [true, "No comment text provided"],

    }
})


const PeepComment = mongoose.model("PeepComment", peepCommentSchema);
export default PeepComment;