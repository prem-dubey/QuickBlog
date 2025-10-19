import jwt from "jsonwebtoken";
import { Blog } from "../models/blog.models.js";
import {Comment} from "../models/comment.models.js"
import { User } from "../models/user.models.js";
import bcrypt from 'bcryptjs'


const userRegister = async(req , res)=>{
    try {
        const {name , email , password , avatar} = req.body;
        if(!email || !name || !password){
            res.json({sucess:false , message : 'Fill all of the details please'})
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        if(avatar){
            await User.create({
            name:name , email:email , password:hash , avatar:avatar
        })
        }
        else{
            await User.create({
            name:name , email:email , password:hash 
        })
        }
        res.json({sucess:true , message:"Sucessfully registered"})
        
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const userLogin = async (req , res)=>{
    try {
        const {email , password } = req.body;
        if(!email || !password ){
            res.json({sucess:false , message : 'Give both email and pass'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({sucess:false , message : 'Enter valid Email'})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({sucess:false , message : 'Invalid credentials'})
        }

        const token = await jwt.sign({email,isAdmin:false},process.env.JWT_SECRET)
        res.json({sucess:true , token})  
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const adminLogin = async (req , res)=>{
    try {
        const {email , password } = req.body;
        if(email!=process.env.ADMIN_EMAIL || password!=process.env.ADMIN_PASSWORD){
            res.json({sucess:false , message : 'Give both email and pass'})
        }
        const token = await jwt.sign({email,isAdmin:true},process.env.JWT_SECRET)
        res.json({sucess:true , token})  
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const getAllBlogsAdmin = async (req , res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt:-1})
        res.json({sucess:true , blogs}) 
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const getAllComments = async(req , res)=>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1});
        res.json({sucess:true , comments})
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const getDashboard = async (req ,res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false});
        const dashboardData = {
            blogs , comments , drafts , recentBlogs
        }
        res.json({sucess:true , dashboardData})
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const deleteCommentById = async(req , res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({sucess:true , message : "Sucessfully deleted the comment"});
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

const approveCommentById = async(req , res)=>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id , {isApproved : true});
        res.json({sucess:true , message : "Sucessfully approved the comment"});
    } catch (error) {
        res.json({sucess:false , message : error.message})
    }
}

export {adminLogin , getAllBlogsAdmin , getAllComments , getDashboard , deleteCommentById , approveCommentById , userRegister , userLogin }