import mongoose from "mongoose";
import dotenv from "dotenv";
import PeepComment from "../../model/peepComment.model.js";
import Peep from "../../model/peep.model.js";
import Account from "../../model/account.model.js";
import hashPassword from "../../middleware/hashPassword.js";

dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });


export async function clearDatabases() {

    await mongoose.connect(process.env.DB_URI);
    await Account.deleteMany();
    await Peep.deleteMany();
    await PeepComment.deleteMany();

}

let account;
let peep;
let peepComment;

export async function createAccount() {
    try {
        await mongoose.connect(process.env.DB_URI);
        const hashedPassword = await hashPassword("gfsdsgsgs3425FFF##");
        account = new Account({
            "fName": "Terry",
            "lName": "Cliff",
            "username": "tc_cliff_boy",
            "email": "cliffman@gmail.com",
            "password": hashedPassword
        });

        account = await account.save();
        return account;
    }catch (e) {
        console.log(e)
    }
}

export async function createPeep(){
    try{
        await mongoose.connect(process.env.DB_URI);
        peep = new Peep({
            "accountId": account._id.toString(),
            "textContent": "This is my peep and im very proud",
        })

        peep = await peep.save();
        return peep;
    }catch (e){
        console.log(e);
    }
}

export async function createPeepComment(){
    try{
        await mongoose.connect(process.env.DB_URI);
        peepComment = new PeepComment({
            "peepId": peep._id.toString(),
            "accountId": account._id.toString(),
            "commentText": "I dont like this peep"
        })

        peepComment = await peepComment.save();
        return peepComment;
    }catch(e){
        console.log(e);
    }
}


