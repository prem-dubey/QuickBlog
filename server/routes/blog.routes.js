import {Router} from 'express';
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getAllDashboardBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blog.controllers.js";
import upload from '../middlewares/multer.middleware.js';
import auth from '../middlewares/auth.middleware.js';

const blogRouter = Router();

blogRouter.route('/add').post(auth , upload.single('image'),addBlog);
blogRouter.route('/all').get(getAllBlogs);
blogRouter.route('/dash-blogs').get(getAllDashboardBlogs);
blogRouter.route('/:blogId').get(getBlogById);
blogRouter.route('/delete').post(auth , deleteBlogById);
blogRouter.route('/toggle-publish').post(auth , togglePublish);
blogRouter.route('/add-comment').post(addComment);
blogRouter.route('/comments').post(getBlogComments);
blogRouter.route('/generate').post(auth , generateContent);



export default blogRouter;
