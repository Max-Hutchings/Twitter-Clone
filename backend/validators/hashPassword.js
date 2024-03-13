import bcrypt from "bcrypt";

const saltRounds = 10;

async function hashPassword(password){
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }catch(error){
        throw new Error(error);
    }
}

export default hashPassword;