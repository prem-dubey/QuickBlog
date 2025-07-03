import jwt from "jsonwebtoken";
import { Blog } from "../models/blog.models.js";
import {Comment} from "../models/comment.models.js"


const adminLogin = async (req , res)=>{
    try {
        console.log(req.body , req.params);
        const {email , password } = req.body;
        console.log(process.env.ADMIN_EMAIL , process.env.ADMIN_PASSWORD)
        if(email != process.env.ADMIN_EMAIL || password != process.env.ADMIN_PASSWORD){
            res.json({ sucess : false ,message : "Invalid credentials"})
        } 
        const token = await jwt.sign({email},process.env.JWT_SECRET)
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

export {adminLogin , getAllBlogsAdmin , getAllComments , getDashboard , deleteCommentById , approveCommentById }