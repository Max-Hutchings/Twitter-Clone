import express from "express";
import {check, validationResult} from "express-validator";
import bcrypt from "bcrypt";
import Account from "../model/account.model.js";
import hashPassword from "../validators/hashPassword.js";
import generateJWT from "../validators/generateJWT.js";
import getIDFromJWT from "../validators/getIDFromJWT.js";
import authenticateJWT from "../validators/verifyJWT.js";


export const router = express.Router();


// POST create account endpoint
router.route("/sign-up").post(
    [
        check('fName', 'First name is required').not().isEmpty(),
        check('lName', 'Last name is required').not().isEmpty(),
        check("username", "Please include username").not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})

    ],
    async (request, response) => {
        const errors = validationResult(request);

        // IF errors
        if (!errors.isEmpty()) {
            return response.status(412).json({
                "message": "Invalid user details",
                "errors": errors.array()
            })
        }

        try {
            const hashedPassword = await hashPassword(request.body.password);
            const accountDetails = {
                "fName": request.body.fName,
                "lName": request.body.lName,
                "username": request.body.username,
                "email": request.body.email,
                "password": hashedPassword,
            }
            const newAccount = new Account(accountDetails);
            // Using mongoose to handle saving to repository
            await newAccount.save()
            // console.log("Account saved")
            return response.status(200).json({"message": "Successfully create account"});
        } catch (error) {
            console.log(error.message);
            response.status(422).json({

                "message": "Failed to sign up",
                "error": error.message
            })
        }
    }
)


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
            if (!account) return res.status(400).json({"message": "Account not found"});

            // Password check
            const passwordsMatch = await bcrypt.compare(req.body.password, account.password);

            // reject incorrect password
            if (!passwordsMatch) return res.status(400).json({"message": "Invalid password"});

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
