import React from 'react'
import {assets} from '../../assets/assets.js' 
import {Outlet, useNavigate} from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar.jsx'
import { UseAppContext } from '../../context/AppContext.jsx'


const Layout = () => {

  const {axios , setToken , navigate} = UseAppContext();

  const logout = ()=>{
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  }

  return (
    <>
    <div className='flex items-center justify-between py-2 px-4 h-[70px] sm:px-12 border-b border-gray-200 '>
      <img src={assets.logo} alt="logo" className='cursor-pointer w-32 sm:w-40' onClick={()=>navigate('/')} />
      <button className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer' onClick={()=>logout()}>Logout</button>
    </div>

    <div className='flex h-[calc(100vh-70px)]'>
      <Sidebar/>
      <Outlet/>
    </div>
    </>
  )
}

export default Layout
