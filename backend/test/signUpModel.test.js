import mongoose from "mongoose";
import {expect} from "chai";
import Account from "../model/account.model.js";
import {passwords} from "../test/test_data/signUpTestData.js";

describe("Account Model Password Validation Tests", () => {
    const validateAndGetErrorMessage = (password) => {
        const account = new Account({
            fName: "Ed",
            lName: "Wright",
            username: "donut_lover",
            email: "ed@digitalfutures.com",
            password: password
        });

        const error = account.validateSync();
        return error.errors["password"] ? error.errors["password"].message : "";
    };

    it("should fail validation for no uppercase letter in password", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.noUppercase);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should fail validation for no lowercase letter in password", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.noLowercase);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should fail validation for no number in password", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.noNumber);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should fail validation for no special character in password", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.noSpecialChar);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should fail validation for less than eight characters in password", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.tooShort);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should fail validation for password meeting length but not other requirements", () => {
        const errorMessage = validateAndGetErrorMessage(passwords.justLongEnough);
        expect(errorMessage).to.equal("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character");
    });

    it("should successfully validate a correct password", async () => {
        const account = new Account({
            fName: "Ed",
            lName: "Wright",
            username: "donut_lover",
            email: "ed@digitalfutures.com",
            password: passwords.validPassword
        });

        const error = account.validateSync();
        expect(error).to.be.undefined;
        
    });
})