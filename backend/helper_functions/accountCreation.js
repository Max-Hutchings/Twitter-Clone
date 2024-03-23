
import Account from "../model/account.model.js";
import hashPassword from "../middleware/hashPassword.js";

export async function createAccount(details) {
    const hashedPassword = await hashPassword(details.password);
    const accountDetails = {
        "fName": details.fName,
        "lName": details.lName,
        "username": details.username,
        "email": details.email,
        "password": hashedPassword,
    }
    const newAccount = new Account(accountDetails);
    await newAccount.save();
    return newAccount;
}