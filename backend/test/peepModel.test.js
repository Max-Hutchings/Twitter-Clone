import {expect} from "chai";
import Peep from "../model/peep.model.js";
import {tooLongString} from "./test_data/peepModelTestData.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Account from "../model/account.model.js";
import hashPassword from "../validators/hashPassword.js";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });


describe("Test the peep model", () => {

    let account;

    before(async() => {
        try{
            await mongoose.connect(process.env.DB_URI);
            await Account.deleteMany();
            const hashedPassword = await hashPassword("dfknfsdfs345##!FF")
            account = new Account({
                fName: "Ed",
                lName: "Wright",
                username: "crispy_cream",
                email: "ed@digitalfutures.com",
                password: hashedPassword
            });

            account = await account.save();
        }catch (e) {
            console.log("Failed to prepare account for peep model test");
            console.log(e);
        }
    })

    it("Should reject due to no account id", async() => {
        const peep = new Peep({
            "textContent": "This is my peep!"
        })

        const error = peep.validateSync();
        expect(error.errors['accountId'].message).to.equal("No account connected to peep");
    })

    it("Should reject due to no text content", async() => {
        const peep = new Peep({
            "textContent": "",
            "accountId": account._id.toString()

        })

        const error = peep.validateSync();
        expect(error.errors['textContent'].message).to.equal("No peep text content");
    })

    it("Should reject due to text content too long", async() => {
        const peep = new Peep({
            "textContent": tooLongString,
            "accountId": account._id.toString()
        })

        const error = peep.validateSync();
        expect(error.errors['textContent'].message).to.equal("Text content too long");
    })
})