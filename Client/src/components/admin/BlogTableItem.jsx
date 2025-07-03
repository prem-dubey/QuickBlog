import React from 'react'
import { assets } from '../../assets/assets';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog , fetchBlogs , index}) => {

    const {title , createdAt} = blog;
    const blogDate = new Date(createdAt);

    const {axios} = UseAppContext();

    const deleteBlog = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this blog?');
      if(!confirm){
        return ;
      }
      try {
        const {data} = axios.post('/api/blog/delete',{id : blog._id});
        if(data.sucess){
          toast.success(data.message);
          await fetchBlogs();
        }
        else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const togglePublish = async ()=>{
      try {
        const {data} = await axios.post('/api/blog/toggle-publish',{id : blog._id});
        if(data.sucess){
          toast.success(data.message);
          await fetchBlogs();
        }
        else{
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
      
    }


  return (
    <tr className='border-y border-gray-300 '>
        <td className='px-2 sm:pl-6 py-4 '>{index}</td>
        <td className='px-2 py-4 '>{title}</td>
        <td className='px-2 py-4 max-sm:hidden'>{blogDate.toDateString()}</td>
        <td className='px-2 py-4 max-sm:hidden'>
            <p className={`${blog.isPublished ? 'text-green-600' : 'text-orange-700'}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className='px-2 py-4 text-xs gap-3 flex'>
            <button onClick={()=>togglePublish()} className='border-2 px-2 py-0.5 mt-1 rounded cursor-pointer '>{blog.isPublished ? 'Unublish' : 'Publish'}</button>
            <img onClick={()=>deleteBlog()} src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" />
        </td>
    </tr>
  )
}

export default BlogTableItem
