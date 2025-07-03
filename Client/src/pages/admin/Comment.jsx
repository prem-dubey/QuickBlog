import React, { useActionState, useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Comment = () => {
  const [comments , setComments] = useState([]);
  const [filter , setFilter] = useState('Not Approved');

  const {axios} = UseAppContext();

  const fetchComments = async ()=>{
    try {
      const {data} = await axios.get('/api/admin/comments');
      data.sucess ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchComments()
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 '>
      <div className='flex justify-between items-center max-w-3xl '>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={()=>setFilter('Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>Approved</button>
          <button onClick={()=>setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>Not Approved</button>
        </div>
      </div>

      <div className='relative h-4/5  max-w-3xl mt-4 rounded-lg scrollbar-hide overflow-x-auto shadow bg-white '>
        <table className='w-full text-gray-500 text-sm'>
            <thead className='text-xs text-gray-900 text-left uppercase'>
              <tr>
                <th scope='col' className='px-6 py-3 '>Blog Title And Comment</th>
                <th scope='col' className='px-6 py-3 max-xm:hidden'>Date</th>
                <th scope='col' className='px-6 py-3 '>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.filter((comment)=>{
                if(filter === 'Not Approved') return comment.isApproved === false;
                return comment.isApproved === true;
              }).map((comment , index)=><CommentTableItem key={comment._id} comments={comment} index={index+1} fetchComments={fetchComments}/>)}
            </tbody>
            {console.log(comments)}
          </table>
      </div>
    </div>
  )
}

export default Comment
