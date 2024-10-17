const jwt = require('jsonwebtoken');
const ensureAuth = (req,res,next)=>{
    if(!req.headers['authorization']){
        return res.status(403).json({message:"token is required"})
    }
    try{
       const decoded = jwt.verify(req.headers['authorization'],"full-secret");
       next()
    }catch(err){
        return res.status(403).json({message:"Token is not valid, or it is expired"})
    }
}

module.exports={
    ensureAuth
}