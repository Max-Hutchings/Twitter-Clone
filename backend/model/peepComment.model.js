import mongoose, {Schema} from "mongoose";


const peepCommentSchema = new Schema({
    "peepId": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No peep found"],
        ref: "Peep"
    },

    "accountId": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user must be identifiable"],
        ref: "Account"
    },

    "commentText": {
        type: String,
        required: [true, "No comment text provided"],
        validate: {
            validator: value => {
                return value.length < 300;},
            message: "Text content too long"
        }
    },
    "createdDate": {
        type: Date,
        default: Date.now
    }
})


const PeepComment = mongoose.model("PeepComment", peepCommentSchema);
export default PeepComment;