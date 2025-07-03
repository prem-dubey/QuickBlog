import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
  const {title , description , category , image , _id} = blog;
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate(`/blog/${_id}`)} className='rounded-2xl border-gray-300 border'>
      <img src={image}  alt="" className="aspect-video rounded-t-2xl " />
      <span className="text-primary bg-primary/20 ml-5 text-xs mt-4 px-3 pt-1 inline-block rounded-full">{category}</span>
      <div className="p-5 ">
        <h5 className="text-gray-900 font-medium mb-2">{title}</h5>
        <p className="mb-3 text-xs text-gray-600" dangerouslySetInnerHTML={{"__html" : description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard
