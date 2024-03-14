import PeepComment from "../../model/peepComment.model.js";
import mongoose from "mongoose";
import Peep from "../../model/peep.model.js";
import {
    clearDatabases,
    createAccount,
    createPeep,
    createPeepComment
} from "../adding_data_databases/AddUserPeepandPeepComment.js";
import {expect} from "chai";


describe("Tests the peep comment model", () => {

    let account;
    let peep;

    before(async() => {
        await clearDatabases();
        account = await createAccount();
        peep = await createPeep();
    })

    it("Should add peep to the database", async() => {
        const newPeepComment = new PeepComment({
            "peepId": peep._id.toString(),
            "commentText": "I hate this peep"
        });

        const error = newPeepComment.validateSync();
        expect(error).to.be.undefined;
    })

    it("Should reject due to missing peepId", async () => {
        const newPeepComment = new PeepComment({
            "commentText": "I hate this peep"
        });

        const error = newPeepComment.validateSync();
        expect(error.errors['peepId']).to.exist;
    });

    it("Should reject due to missing commentText", async () => {
        const newPeepComment = new PeepComment({
            "peepId": peep._id.toString()
        });

        const error = newPeepComment.validateSync();
        expect(error.errors['commentText']).to.exist;
    });

    it("Should reject due to invalid peepId type", async () => {
        const newPeepComment = new PeepComment({
            "peepId": "12345",
            "commentText": "Invalid peepId type test"
        });

        const error = newPeepComment.validateSync();
        expect(error.errors['peepId']).to.exist;
    });

    it("Should reject due to excessively long commentText", async () => {
        let longComment = "a".repeat(301);
        const newPeepComment = new PeepComment({
            "peepId": peep._id.toString(),
            "commentText": longComment
        });

        const error = newPeepComment.validateSync();
        expect(error.errors['commentText']).to.exist;
    });


})