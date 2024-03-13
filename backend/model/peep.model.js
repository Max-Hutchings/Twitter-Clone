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
            validator: value => {return value.length > 1;},
            message: "Text content not long enough"
        }
    },

    "createdDate": {
        type: Date,
        default: Date.now
    }
})

const Peep = mongoose.model("Peep", peepSchema);
export default Peep;