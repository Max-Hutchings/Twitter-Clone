import jwt from 'jsonwebtoken';

function getIdFromJWT(token) {
    if (!token) throw new Error("No token present");

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                reject(new Error("Invalid token"));
            } else {
                resolve(decoded.userId); // assuming the payload has a property named 'id'
            }
        });
    });
}

export default getIdFromJWT;
