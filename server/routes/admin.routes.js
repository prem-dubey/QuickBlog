import { Router } from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/admin.controllers.js";
import auth from '../middlewares/auth.middleware.js'

const adminRouter = Router();

adminRouter.route('/login').post(adminLogin);
adminRouter.route('/comments').get(auth , getAllComments);
adminRouter.route('/blogs').get(auth , getAllBlogsAdmin);
adminRouter.route('/delete-comment').post(auth , deleteCommentById);
adminRouter.route('/approve-comment').post(auth ,approveCommentById );
adminRouter.route('/dashboard').get(auth ,getDashboard);





export default adminRouter