import hashPassword from "../../validators/hashPassword.js"
import Account from "../../model/account.model.js"
import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import server from "../../server.js";

import {
    correctDetails,
    incorrectEmail,
} from "../test_data/loginTestData.js";
import mongoose from "mongoose";


const TESTPATH = "/authentication/login";

chai.use(chaiHttp);


describe("Tests login endpoint", () => {

    beforeEach(async() => {
        try{
            await mongoose.connect(process.env.DB_URI);
            await Account.deleteMany();
            // console.log("Clear accounts ready for testing");
            const hashedPassword = await hashPassword("123PASword#!");
            const account = new Account({
                "fName": "Max",
                "lName": "Hutchings",
                "username": "donut_lover",
                "email": "max@gmail.com",
                "password": hashedPassword
            })

            await account.save();
            // console.log("saved practice account");
        }catch(e){
            console.log(e);
            throw new Error();
        }
    })


    it("Should login successfully with valid details", async() => {
        const response = await chai.request(server)
            .post(TESTPATH)
            .send(correctDetails);
        
        expect(response).to.have.status(200);
        expect(response).to.have.cookie('token');
    })

    it ("Should fail login due to incorrect email", async() => {
        const response = await chai.request(server)
            .post(TESTPATH)
            .send(incorrectEmail);

        expect(response).to.have.status(400);
        expect(response.body).to.have.property("message", "Account not found");
    })
})