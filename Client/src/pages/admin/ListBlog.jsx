import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {

  const {axios , setBlog} = UseAppContext();

  const [blogs , setBlogs ] = useState([]);


  const fetchBlogs = async ()=>{
    try {
      const {data} = await axios.get('/api/blog/dash-blogs');
      console.log(data);
      if(data.sucess){
        setBlogs(data.blogs);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div className='flex-1 h-4/5 pt-5 px-5 sm:pt-12 sm:pl-6 bg-blue-50/50 '>
      <h1>All Blogs</h1>
        <div className='relative  max-w-4xl rounded-lg scrollbar-hide overflow-x-auto shadow bg-white '>
          <table className='w-full text-gray-500 text-sm'>
            <thead className='text-xs text-gray-500 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6 '>#</th>
                <th scope='col' className='px-2 py-4 '>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4 '>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {blogs.map((blog,index)=>{
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default ListBlog
