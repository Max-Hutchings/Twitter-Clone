import {
    clearDatabases,
    createAccount,
    createPeep,
    createPeepComment
} from "../adding_data_databases/AddUserPeepandPeepComment.js";
import server from "../../server.js";

import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);

const ENDPOINT = "/peep-comment"


describe("Testing endpoints for peep comment", () => {

    let account;
    let peep;
    let peepComment;
    let token;

    before(async() => {
        await clearDatabases();
        account = await createAccount();
        token = await jwt.sign({userId: account._id.toString()}, process.env.JWT_SECRET, {expiresIn: "1h"});
        peep = await createPeep();
        peepComment = await createPeepComment();
    })


    it("Should get all comments for a particular peep", async() => {
        const response = await chai.request(server)
            .get(ENDPOINT + `/${peep._id.toString()}`);

        expect(response).to.have.status(200);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an('array');
        expect(response.body.data).to.have.lengthOf.at.least(1);

    })

    it("Should add a peep comment", async() => {
        const response = await chai.request(server)
            .post(ENDPOINT + "/add-peep-comment")
            .send({
                "peepId": peep._id.toString(),
                "commentText": "This is my comment hating on the peep"})
            .set("Cookie", `token=${token}`);


        expect(response).to.have.status(200);
    })


})