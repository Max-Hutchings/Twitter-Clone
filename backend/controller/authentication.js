import express from "express";
import {check, validationResult} from "express-validator";
import bcrypt from "bcrypt";
import Account from "../model/account.model.js";
import hashPassword from "../middleware/hashPassword.js";
import generateJWT from "../middleware/generateJWT.js";
import getIDFromJWT from "../middleware/getIDFromJWT.js";
import authenticateJWT from "../middleware/verifyJWT.js";
import validateInput from "../middleware/validateInput.js";
import {createAccount} from "../helper_functions/accountCreation.js";
import errorHandler from "../middleware/errorHandler.js";

// Creating a new router object
export const router = express.Router();

// Defining a new route for user sign-up
router.route("/sign-up").post(
    [
        // Input validation checks using express-validator
        check('fName', 'First name is required').not().isEmpty(),
        check('lName', 'Last name is required').not().isEmpty(),
        check("username", "Please include username").not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
    ],
    validateInput, // Middleware for validating the input
    async (request, response, next) => {
        // If there's an error in the request, pass it to the next middleware
        if (request.error) {
            return next(request.error);
        }
        try {
            // Create a new account using the request body
            const newAccount = await createAccount(request.body);
            // If successful, send a success message
            return response.status(200).json({"message": "Successfully create account"});
        } catch (error) {
            // If there's an error, pass it to the next middleware
            next(error);
        }
    },
    errorHandler // Error handling middleware
);


router.route("/login").post(
    [
        check("email", "Email is required").not().isEmpty(),
        check("password", "Password is required").not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({"message": "Failed to login", "errors": errors.array()})
        }
        try {
            const account = await Account.findOne({email: req.body.email}).exec();
            if (!account) return res.status(401).json({"message": "Account not found"});

            // Password check
            const passwordsMatch = await bcrypt.compare(req.body.password, account.password);

            // reject incorrect password
            if (!passwordsMatch) return res.status(401).json({"message": "Invalid password"});

            const jwt = await generateJWT(account._id);



            return res
                .cookie("token", jwt, {httpOnly: true, secure: true, sameSite: "none"})
                .status(200).json({
                    "message": "Login Successful",
                    "fName": account.fName,
                    "lName": account.lName,
                    "username": account.username,
                    "email": account.email
            })
        } catch (e) {
            return res.status(500).json({
                "message": "Failed to login",
                "error": e.message
            })
        }

    }
)

router.route("/logout").post(
    (req, res) => {
        res.clearCookie("token");
        res.status(200).json({"message": "Logged out successfully"})
    }
)


router.route("/change-password").put(
    [
        check("currentPassword").notEmpty(),
        check("newPassword").notEmpty()
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({"message": "no input values submitted"});

        // Check password
        const userId = await getIDFromJWT(req.cookies.token);

        if (!userId) return res.status(401).json({"message": "Invalid token"});

        const account = await Account.findById(userId);
        if (!account) return res.status(404).json({"message": "Account not found"});


        const matchCurrentPassword = await bcrypt.compare(req.body.currentPassword, account.password);
        if (!matchCurrentPassword) return res.status(400).json({"message": "Incorrect current password"});

        try {
            account.password = await hashPassword(req.body.newPassword);
            await account.save();
            return res.status(200).json({"message": "Successfully changed password"});
        } catch (e) {
            return res.status(400).json({"message": "Failed to change password", "error": e.message})
        }

    }
)


router.route("/validate-jwt").get(
    authenticateJWT,
    async (request, response) => {

        //     If the request gets past the authenticateJWT middleware,
        //     We can send back user details

        try {
            const userId = await getIDFromJWT(request.cookies.token);
            const account = await Account.findById(userId);

            if (!account) return response.status(401).json({message: "Failed to get user"});

            const jwt = await generateJWT(account._id);

            return response
                .cookie("token", jwt, {httpOnly: true, secure: true, sameSite: "none"})
                .status(200).json({
                    "message": "Login Successful",
                    "fName": account.fName,
                    "lName": account.lName,
                    "username": account.username,
                    "email": account.email
                })
        } catch (e) {
            return response.status(500).json({
                "message": "Failed to get account",
                "errors": e.message
            })
        }
    }
)
