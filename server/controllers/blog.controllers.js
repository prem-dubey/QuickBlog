import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import {Blog} from '../models/blog.models.js';
import { Comment } from '../models/comment.models.js';
import main from '../configs/gemini.js';

const addBlog = async(req , res )=>{
    try {
        const {title , subTitle , description , category , isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        //check if all fields are present
        if(!title || !description || !category || !isPublished){
            return res.json({sucess : false , message : "Values missing in adding blog content"})
        }
        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload image to imagekit 
        const response = await imagekit.upload({
            file : fileBuffer, 
            fileName: req.file.originalname,
            folder : '/blogs'

        })

        //optimization through url imagekit transformation
        const optimizedImage = imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},
                {format : 'webp'},
                {width:'1280'}
            ]
        });

        const image = optimizedImage;
        await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        });

        res.json({sucess : true , message : "Blog added successfully"})

    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const getAllBlogs = async(req , res)=>{
    try {
        const blogs = await Blog.find({isPublished : true})
        res.json({sucess : true , blogs})
    } catch (error) {
        res.json({sucess : false , message : error.message})
        
    }
}

const getAllDashboardBlogs = async(req , res)=>{
    try {
        const blogs = await Blog.find({});
        res.json({sucess : true , blogs})
    } catch (error) {
        res.json({sucess : false , message : error.message})
        
    }
}

const getBlogById = async (req , res)=>{
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            res.json({sucess : false , message : "No such blog found"})
        }
        res.json({sucess : true , blog})
    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const deleteBlogById = async (req , res)=>{
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)
        //deleting all the comments associated with it 
        await Comment.deleteMany({blog:id});
        res.json({sucess : true , message : "Blog Sucessfully deleted"})
    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const togglePublish = async (req , res)=>{
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished; 
        await blog.save();
        res.json({sucess : true , message : "Blog Status Updated"})

    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const addComment = async (req , res)=>{
    try {
        const {blog , name , content } = req.body;
        await Comment.create({
            blog , name , content
        })
        res.json({sucess : true , message : "Comment added for review sucessfully"})
    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const getBlogComments = async (req , res)=>{
    try {
        const {blogId} = req.body;
        const comments = await Comment.find({blog:blogId , isApproved:true}).sort({createdAt : -1});
        res.json({sucess : true , comments})
    } catch (error) {
        res.json({sucess : false , message : error.message})
    }
}

const generateContent = async(req , res)=> {
    try {
        const {prompt} = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple text format');
        res.status(200).json({sucess:true , content});
    } catch (error) {
        res.json({sucess : false , message : error.message});
    }
}


export {addBlog , getAllBlogs , getBlogById , deleteBlogById , togglePublish , addComment , getBlogComments , getAllDashboardBlogs , generateContent}