import Account from "../../model/account.model.js"
import hashPassword from "../../validators/hashPassword.js";

import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";

import {
    correctPasswordChange,

} from "../test_data/changePasswordTestData.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const ENDPOINT_PATH = "/authentication/change-password";

chai.use(chaiHttp);

describe("Tests the change password endpoint", () => {
    let token;
    let account;
    beforeEach(async () => {
        try {
            await mongoose.connect(process.env.DB_URI);
            await Account.deleteMany();
            const hashedPassword = await hashPassword("123PASword#!");
            account = new Account({
                "fName": "Max",
                "lName": "Hutchings",
                "username": "donut_lover",
                "email": "max@gmail.com",
                "password": hashedPassword
            })

            await account.save();

            account = await Account.findOne({email: "max@gmail.com"})
            token = await jwt.sign({userId: account._id.toString()}, process.env.JWT_SECRET, {expiresIn: "1h"});

        } catch (e) {
            console.log(e);
            throw new Error();
        }
    })

    it("Should allow the password to be changed", async () => {

        const response = await chai.request(server)
            .put(ENDPOINT_PATH)
            .set("Cookie", `token=${token}`)
            .send(correctPasswordChange);

        expect(response).to.have.status(200);

    })
})