import { assets , footer_data} from "../assets/assets"

const Footer = () => {
  return (
    <div className='px-10 md:px-20 xl:px-30 bg-primary/3'>
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
            <div>
                <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
                <p className="mt-6 max-w-[410px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?</p>
            </div>

            <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                {footer_data.map((data,index)=>(
                    <div key={index}>
                        <h3 className="text-gray-900 font-semibold text-base mb-2 md:mb-5 ">{data.title}</h3>
                        <ul className="text-sm space-y-1 ">
                            {data.links.map((link , ind)=>(
                            <li key={ind} className="hover:underline transition ">
                                <a href="#">{link}</a>
                            </li>
                            ))}
                        </ul>
                    </div>
                ))}

            </div>
        </div>
        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">Copyright 2025 © QuickBlog All Right Reserved.</p>
    </div>
  )
}

export default Footer
