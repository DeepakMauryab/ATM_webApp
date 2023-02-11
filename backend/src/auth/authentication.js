const jwt= require("jsonwebtoken");
const collection= require("../database/model");

const authentication = async (req, res, next) => {
    try {
        const token= req.cookies.atmdata;
        const verifyToken= jwt.verify(token, process.env.SECRET_KEY);
        const userData= await collection.findOne({_id: verifyToken._id, "tokens.token":token});
        req.userData= userData;
        next();
    } catch (error) {
        res.status(422).send("data not found");
    }
};

module.exports= authentication;