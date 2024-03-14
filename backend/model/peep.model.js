import mongoose, { Schema } from "mongoose";

const peepSchema = new Schema({
    "accountId": {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "No account connected to peep"],
        ref: "Account"
    },

    "textContent": {
        type: String,
        required: [true, "No peep text content"],
        validate: {
            validator: value => {return value.length < 300;},
            message: "Text content too long"
        }
    },

    "createdDate": {
        type: Date,
        default: Date.now
    }
})

const Peep = mongoose.model("Peep", peepSchema);
export default Peep;