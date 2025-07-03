import React, { useEffect, useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import { blog_data , comments_data } from '../assets/assets';
import Navbar from '../components/Navbar'
import {assets} from '../assets/assets'
import { div } from 'motion/react-client';
import Footer from '../components/Footer'
import Loader from '../components/Loader';
import { UseAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const Blog = () => { 
  const {id} = useParams()

  const {axios} = UseAppContext();

  const [data , setData] =useState(null);
  const [comments , setComments] =useState([]);

  const [name , setName] = useState('');
  const [content , setContent] = useState('');

  const fetchBlogData =async ()=>{
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.sucess ? setData(data.blog) : toast.error(data.message) ;
    } catch (error) {
      toast.error(error.message) ;
    }
  }

  const fetchComments = async ()=>{
    try {
      const {data} = await axios.post('/api/blog/comments', {blogId : id});
      console.log(data.comments)
      data.sucess ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } 
  }

  const addComment = async (e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/blog/add-comment',{blog : id , name , content})
      if(data.sucess){
        toast.success(data.message);
        setName('');
        setContent('');
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  },[])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground}  alt=""className='absolute -top-50 -z-1 '/>
      <Navbar/>

      <div className=' text-center mt-20 '>
        <p className='text-primary text-md py-4'>published on {new Date(data.createdAt).toDateString()} </p>
        <h1 className='text-2xl sm:text-3xl md:text-5xl max-w-2xl font-semibold mx-auto '>{data.title}</h1>
        <p className='my-5 truncate max-w-lg mx-auto'>{data.subTitle}</p>
        <p className='inline-block py-1 px-4 rounded-full mb-6 text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Piyush Dubey</p>
      </div>
      

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="thumbnail" className='rounded-2xl mb-10' />
        <div dangerouslySetInnerHTML={{"__html":data.description}} className='rich-text max-w-3xl my-10 mt-6 md:mx-auto'></div>
      </div>

      {/* Comment Section */}
      <div className='mt-14 mb-10 max-w-3xl mx-auto'>
        <p className='font-semibold mb-5'>Comments ({comments.length})</p>
        <div className='flex flex-col gap-5 '>
          {comments.map((comment , index)=>(
            <div key={index} className=' relative bg-primary/2 max-w-3xl border border-primary/5 p-4 rounded text-gray-600 gap-10 space-y-2'>
              <div className='flex gap-4'>
                <img src={assets.user_icon} alt="" className='w-5 h-auto'/>
                {comment.name}
              </div>
              <div className='pl-8 flex justify-between'>
                <div className='text-sm max-w-md '>{comment.content}</div>
                <div className='text-gray-400'>{new Date(comment.createdAt).toDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add comment section */}
      <div className='max-w-3xl mx-auto '>
        <p className='font-semibold mb-4'>Add your comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none' value={name}  />
          <textarea onChange={(e)=>setContent(e.target.value)} placeholder='Comment' className='h-48 w-full p-2 border border-gray-300 rounded outline-none' value={content}></textarea>
          <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>

        </form>
      </div>

      {/* Share buttons */}
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4 '>Share this article on social media</p>
        <div className='flex'>
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.googleplus_icon} alt="" />
        </div>
      </div>

      <Footer/>

    </div>
  ) : <Loader/>
}

export default Blog


