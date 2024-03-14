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
        validate: {
            validator: value => {
                return value.length < 300;},
            message: "Text content too long"
        }
    }
})


const PeepComment = mongoose.model("PeepComment", peepCommentSchema);
export default PeepComment;