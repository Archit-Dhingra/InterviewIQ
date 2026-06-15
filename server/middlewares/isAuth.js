import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isAuth = async (req,res,next) => {
    try{
       let  token = req.cookies.token;

       if(!token){
           return res.status(400).json({message : "User does not have a token"});
       }

       const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

       if(!verifyToken){
        return res.status(400).json({message : "Invalid Token"});
       }

       req.userId = verifyToken.userId;  

       next();
    }
    catch(error){
        return res.status(500).json({message : `Authentication Failed, error : ${error.message}`})
    }
}

export default isAuth;