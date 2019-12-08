const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;

    try{
        decodedToken = jwt.verify(token, 'somesecret');
    }catch(err){
        err.statusCode = 500;
        return next(err);
    }

    if(!decodedToken) {
        const error = new Error("Not Authenticated.");
        error.statusCode = 401;
        return next(error);
    }

    req.userId = decodedToken.userId.toString();

    next();

} 

