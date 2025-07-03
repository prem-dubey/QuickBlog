import { assets, blog_data, blogCategories } from '../assets/assets'
import {motion, spring} from 'motion/react'
import BlogCard from './BlogCard';
import { useState } from 'react';
import { UseAppContext } from '../context/AppContext';
import { useEffect } from 'react';


const BlogList = () => {
    const [menu , setMenu] = useState('All');
    const {blog , input} = UseAppContext();

    const filteredBlogs = ()=>{
      if(input === ''){
        return blog
      }
      return blog.filter((blog)=> blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
    }

    

  return (
    <div >
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (<div key={item} className='relative'>
            <button className={`cursor-pointer text-gray-500 ${menu===item && 'text-white px-4 pt-0.4'}`} onClick={()=>setMenu(item)}>
                {item}
                {menu === item && (
                    <motion.div layoutId='underline' 
                     className='absolute rounded-full bg-primary left-0 right-0 top-0 h-7 -z-1'
                     transition={{type:spring , stiffness:500 , damping : 30}}
                     ></motion.div>
                )}
                
            </button>
        </div>))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
        {filteredBlogs().filter((blog)=> menu === 'All'?true:blog.category === menu).map((blog)=> <BlogCard key={blog._id} blog={blog}/>)}
      </div>
    </div>
  )
}

export default BlogList

