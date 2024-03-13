import  jwt  from "jsonwebtoken";


function authenticateJWT(req, res, next){
    const token = req.cookies.token;

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

export default authenticateJWT;