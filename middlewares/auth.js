const jwt = require('jsonwebtoken')

module.exports = async function (req,res,next){
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        if(!token) {
            res.status(401).send("Access denied. No token provided")
            return
        }
        const decoded = jwt.verify(token,"testPrivateKey");
        req.user = decoded;
        next()   
    } catch (e) {
        res.status(400).send("invalid Token")
    }
}