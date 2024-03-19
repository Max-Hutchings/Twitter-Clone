import chai, {expect} from "chai";
import chaiHttp from "chai-http";
import {clearDatabases, createAccount, createPeep} from "../adding_data_databases/AddUserPeepandPeepComment.js";
import server from "../../server.js";
import jwt from "jsonwebtoken";


chai.use(chaiHttp);

const ENDPOINT_PATH = "/peep";

describe("Tests the /peep endpoints", () => {

    let token;
    let account;

    before(async() => {
        await clearDatabases();
        account = await createAccount();
        await createPeep();
        token = await jwt.sign({userId: account._id.toString()}, process.env.JWT_SECRET, {expiresIn: "1h"});

    })

    it("Should return all peeps", async() => {
        const response = await chai.request(server)
            .get(ENDPOINT_PATH + "/all-peeps");

        expect(response).to.have.status(200);
        expect(response.body).to.have.property("data");
    })

    it("Should add a peep", async() => {
        const response = await chai.request(server)
            .post(ENDPOINT_PATH + "/add-peep")
            .send({"textContent": "This is my first peep! wow!"})
            .set("Cookie", `token=${token}`);

        expect(response).to.have.status(200);
    })


    it("Should reject empty peep", async() => {
        const response = await chai.request(server)
            .post(ENDPOINT_PATH + "/add-peep")
            .send({"textContent": ""})
            .set("Cookie", `token=${token}`);

        expect(response).to.have.status(401);
    })
})