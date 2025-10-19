import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import { UseAppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const {navigate , token, isAdmin, axios, setToken, setIsAdmin} = UseAppContext()

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('isAdmin')
      axios.defaults.headers.common['Authorization'] = null
      setToken(null)
      setIsAdmin(false)
      navigate('/')
    }
  return(
        <>
         <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 ">
            <img src={assets.logo} onClick={() => navigate('/')} alt="logo" className='w-32 sm:w-44'/>
            <div className='flex gap-2'>
              {token && isAdmin ? (
                <>
                  <button onClick={() => navigate('/admin')} className='flex justify-center items-center gap-2 bg-primary rounded-full text-white w-33 cursor-pointer text-sm py-2.5 px-4'>Dashboard
                    <img src={assets.arrow} alt="arrow" className='w-3'/>
                  </button>
                  <button onClick={logout} className='flex justify-center items-center gap-2 border border-primary rounded-full text-primary w-33 cursor-pointer text-sm py-2.5 px-4'>Logout</button>
                </>
              ) : token ? (
                <>
                  <button onClick={logout} className='flex justify-center items-center gap-2 border border-primary rounded-full text-primary w-33 cursor-pointer text-sm py-2.5 px-4'>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/admin')} className='flex justify-center items-center gap-2 bg-primary rounded-full text-white w-33 cursor-pointer text-sm py-2.5 px-4'>Admin Login
                    <img src={assets.arrow} alt="arrow" className='w-3'/>
                  </button>
                  <button onClick={() => navigate('/login')} className='flex justify-center items-center gap-2 border border-primary rounded-full text-primary w-33 cursor-pointer text-sm py-2.5 px-4'>User Login</button>
                  <button onClick={() => navigate('/register')} className='flex justify-center items-center gap-2 border border-primary rounded-full text-primary w-33 cursor-pointer text-sm py-2.5 px-4'>Register</button>
                </>
              )}
            </div>
         </div>
        </>
    )
}

export default Navbar
