import mongoose, { Schema } from "mongoose";
import passwordValidator from "../validators/passwordValidator.js";



const accountSchema = new Schema({
    "fName": {
        type: String, 
        required: [true, "No first name"], 
        validate: {
            validator: value => { return value.length > 1; },
            message: "First name not long enough"
        }
    },

    "lName": {
        type: String,
        required: [true, "No last name"],
        validate: {
            validator: value => {return value.length > 1; },
            message: "Last name not long enough"
        }
    },

    "email": {
        type: String,
        required: [true, "No email supplied"],
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },

    "password": {
        type: String,
        required: [true, "No password supplied"],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
            "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character"
        ]
    }

})

const Account = mongoose.model("Account", accountSchema);
export default Account;