import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        required : true
    },
    parent_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
    upvotes :{
        type:Number,
        default:0
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true
    },
    name : {
        type : String,
    },
    content : {
        type : String,
        required : true
    },
    isApproved : {
        type : Boolean,
        default : false
    }
},{timestamps:true})


export const Comment = mongoose.model("Comment",commentSchema);