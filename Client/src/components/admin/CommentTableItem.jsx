import { img, p } from 'motion/react-client';
import React from 'react'
import { assets } from '../../assets/assets';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({comments , fetchComments}) => {
    const {blog , createdAt , _id} = comments;
    const BlogDate = new Date(createdAt);

    const {axios} = UseAppContext();

    const approvedComment = async ()=>{
      try {
        const {data} = await axios.post('/api/admin/approve-comment' , {id : _id});
        if(data.sucess){
          toast.success(data.message);
          fetchComments();
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const deleteComment = async ()=>{
      try {
        const confirm = window.confirm('Are you sure you want to delete this comment')
        if(!confirm) return;

        const {data} = await axios.post('/api/admin/delete-comment' , {id : _id});
        if(data.sucess){
          toast.success(data.message);
          fetchComments();
        }else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }


  return (
    <tr className='order-y border-gray-300'>
      <td className='px-6 py-4 '>
        <b>Blog</b> : {blog.title}
        <br /><br />
        <b>Name</b> : {comments.name}
        <br />
        <b>Comment</b> : {comments.content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-4'>
        <div className='flex'>
            {!comments.isApproved ? <img onClick={()=>approvedComment()} src={assets.tick_icon} className='w-5 cursor-pointer transition-all hover:scale-110'/> : <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>}
            <img onClick={()=>deleteComment()} src={assets.bin_icon} alt='' className='w-5 cursor-pointer transition-all hover:scale-110'/>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
