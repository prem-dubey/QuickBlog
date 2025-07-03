import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import { UseAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const {navigate , token} = UseAppContext()
  return(
        <>
         <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 ">
            <img src={assets.logo} onClick={() => navigate('/')} alt="logo" className='w-32 sm:w-44'/>
            <button onClick={() => navigate('/admin')} className='flex justify-center items-center gap-2 bg-primary rounded-full text-white w-33 cursor-pointer text-sm py-2.5 '>{token?'Dashboard' : 'Login'}
                <img src={assets.arrow} alt="arrow" className='w-3'/>
            </button>
         </div>
        </>
    )
}

export default Navbar
