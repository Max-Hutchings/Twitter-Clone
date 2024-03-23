import GenerateJWT from "../../middleware/generateJWT.js";
import getIDFromJWT from "../../middleware/getIDFromJWT.js";
import {assert, expect} from "chai";


console.log("JWT Secret:", process.env.JWT_SECRET);


describe("Testing JWT creation and verification", () => {

    it("Should generate a JWT from a user id", async () => {
        const userId = "234";

        const token = GenerateJWT(userId);
        assert.isString(token, "Token should be a string");

        const extractedId = await getIDFromJWT(token);

        // Assert that the extracted ID matches the original
        assert.strictEqual(extractedId, userId, "Extracted user ID should match the original");

    })


})