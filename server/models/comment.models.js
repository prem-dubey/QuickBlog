import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    blog : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        required : true
    },
    name : {
        type : String,
        required : true
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