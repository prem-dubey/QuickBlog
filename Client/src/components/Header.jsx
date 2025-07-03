import { useRef } from "react";
import { assets } from "../assets/assets.js"
import { UseAppContext } from "../context/AppContext.jsx"

const Header = () => {
  const {input , setInput } = UseAppContext();
  const inputRef = useRef();
  const handleSubmit = async (e)=>{
    e.preventDefault(
      setInput(inputRef.current.value)
    )
    console.log('hello')
  }

  const handleClearSearch = async ()=>{
    inputRef.current.value = '';
    setInput('');
  }


  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative '>
      <div className='text-center mt-20 mb-8'>
        <div className="inline-flex justify-center items-center gap-3 rounded-full border-2 px-5 py-2 mb-4 border-primary/40 bg-primary/10 text-sm text-primary">
          <p>New Ai feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 ">Your own <span className="text-primary">blogging</span> <br/> platform.</h1>
        <p className="text-gray-500 my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs">This is your space to think out loud, to share what matters, and to write without filters. Whether it’s one word or a thousand, your story starts right here.</p>

        <form onSubmit={handleSubmit} className="py-1 px-2 rounded-lg border-2 max-w-lg flex justify-between mx-auto bg-white border-gray-300 overflow-hidden max-xm:scale-75" >
          <input ref={inputRef} type="text" required placeholder="search for blogs" className="w-full pl-2 outline-none" />
          <button type="submit" className="bg-primary text-white rounded-lg w-30 h-10">Search</button>
        </form>
      </div>

      <div className="text-center">
        {input && <button onClick={()=>handleClearSearch()} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear Search</button>}
          
        
      </div>



      <img src={assets.gradientBackground}  alt=""className='absolute -top-50 -z-1 '/>
    </div>
  )
}

export default Header
