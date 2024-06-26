import hashPassword from "../../middleware/hashPassword.js";
import Account from "../../model/account.model.js";
import generateJWT from "../../middleware/generateJWT.js";
import chaiHttp from "chai-http";
import chai, {expect} from "chai";
import server from "../../server.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const ENDPOINT_PATH = "/authentication/validate-jwt"

chai.use(chaiHttp);

describe("Tests the /validate-jwt endpoint ", async () => {

    let account;
    let token;

    beforeEach(async () => {
        await mongoose.connect(process.env.DB_URI);
        await Account.deleteMany();
        const hashedPassword = await hashPassword("dsfodfnsodfosdf67##DSDDS");
        account = new Account({
            "fName": "Max",
            "lName": "Hutchings",
            "username": "donut_lover",
            "email": "max@gmail.com",
            "password": hashedPassword
        });

        account = await account.save();
        token = await jwt.sign({userId: account._id.toString()}, process.env.JWT_SECRET, {expiresIn: "1h"});

    })

    after(async () => {
        await Account.deleteMany();

    });

    it("Should validate and provide user details", async () => {
        const response = await chai.request(server)
            .get(ENDPOINT_PATH)
            .set("Cookie", `token=${token}`);

        expect(response).to.have.status(200);
        expect(response.body.fName).to.equal("Max");
        expect(response.body.lName).to.equal("Hutchings");
        expect(response.body.username).to.equal("donut_lover");
        expect(response.body.email).to.equal("max@gmail.com");

    })

})