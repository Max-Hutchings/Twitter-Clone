import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';

import server from '../server.js';  
import Account from '../model/account.model.js';

import { 
    validSignup, 
    noFNameSignUp, 
    noLNameSignUp, 
    incorrectEmailSignUp,
    incorrectPasswordSignUp,
  

} from "./test_data/signUpTestData.js";


const TESTPATH = "/authentication/sign-up";

chai.use(chaiHttp);

describe("Test sign up endpoint", () => {
    beforeEach(async() => {
        try{
        await Account.deleteMany();
        }catch(e){
            console.error(e);
            throw new Error();
        }
    })


    it("Should sign up with valid details present", async () => {
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
        
        expect(res).to.have.status(422);
        expect(res.body).to.have.property("message", "Invalid user details");
    })

    it("Should deny sign up due to no lName", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(noLNameSignUp)

        expect(res).to.have.status(422);
        expect(res.body).to.have.property("message", "Invalid user details");
    })


    it("Should deny sign up due to incorrect email", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(incorrectEmailSignUp);
        
        expect(res).to.have.status(422);
        expect(res.body).to.have.property("message", "Invalid user details");
    })

    it("Should deny due to bad password", async() => {
        const res = await chai.request(server)
            .post(TESTPATH)
            .send(incorrectPasswordSignUp);
        
        expect(res).to.have.status(422);
        expect(res.body).to.have.property("message", "Invalid user details");
    });

})