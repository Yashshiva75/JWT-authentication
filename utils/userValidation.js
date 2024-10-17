const joi = require('joi')
const userRegisterValidation = (req,res,next)=>{
    const schema = joi.object({
        Name : joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).alphanum().required()
    })
    const {error,value} = schema.validate(req.body)
    if(error){
       return res.status(400).json({message:"bad request",error})
    }
    next()
}
//login
const loginUser = (req,res,next)=>{
    const schema = joi.object({
        
        email:joi.string().email().required(),
        password:joi.string().min(4).alphanum().required()
    })
    const {error,value} = schema.validate(req.body)
    if(error){
       return res.status(400).json({message:"bad request",error})
    }
    next()
}

module.exports={
    userRegisterValidation,
    loginUser
}