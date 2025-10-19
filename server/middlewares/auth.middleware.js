import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const auth = async (req , res , next)=>{
    try {
        const token = req.headers.authorization;
        if(!token) return res.json({sucess:false , message : 'Unauthorized'});
        const decoded = await jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findOne({email:decoded.email});
        if(!user){
            return res.json({sucess:false , message : 'no such user'})
        }
        req.user = {
            user_id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: !!decoded.isAdmin
        };
        next();
    } catch (error) {
        res.json({sucess:false , message : error.message})
        
    }
}

export default auth;