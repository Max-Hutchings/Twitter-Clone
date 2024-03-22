import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';

import server from '../../server.js';
import Account from '../../model/account.model.js';

import { 
    validSignup, 
    noFNameSignUp, 
    noLNameSignUp, 
    incorrectEmailSignUp,
    incorrectPasswordSignUp,

} from "../test_data/signUpTestData.js";
import mongoose from "mongoose";


const TESTPATH = "/authentication/sign-up";
chai.use(chaiHttp);

describe("Test sign up endpoint", () => {



    beforeEach(async() => {
        try{
            await mongoose.connect(process.env.DB_URI);
            // console.log(process.env.DB_URI);
            await Account.deleteMany();
            // console.log("Deleted account in preparation");
        }catch(e){
            console.error(e);
            throw new Error();
        }
    })

    it("Should sign up with valid details present", async () => {
        // console.log("test called")
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(validSignup);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Successfully create account")
    })

    it("Should deny sign up due to no fName", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(noFNameSignUp);
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Invalid user details");
    })

    it("Should deny sign up due to no lName", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(noLNameSignUp)

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Invalid user details");
    })


    it("Should deny sign up due to incorrect email", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(incorrectEmailSignUp);
        
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Invalid user details");
    })

    it("Should deny due to bad password", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(incorrectPasswordSignUp);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Invalid user details");
    });

})