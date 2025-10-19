import React, { useState } from 'react'
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const {axios , setToken , setIsAdmin , navigate} = UseAppContext();
    const location = useLocation();
    const mode = location.pathname === '/admin' ? 'admin' : 'user';
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const endpoint = mode === 'admin' ? '/api/admin/login' : '/api/user/login';
            const {data} = await axios.post(endpoint , {email , password});

            if(data.sucess){
                setToken(data.token);
                localStorage.setItem('token',data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
                setIsAdmin(mode === 'admin');
                localStorage.setItem('isAdmin', mode === 'admin' ? 'true' : 'false');
                if(mode==='admin') navigate('/admin'); else navigate('/');
            }
            else{
                console.log('here')
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold mx-auto'><span className='text-primary'>{mode==='admin'?'Admin':'User'}</span> Login</h1>
                    <p className='text-gray-500 font-light mx-auto'>Enter your credentials to access the {mode==='admin'?'admin panel':'site'}</p>
                </div>
                    <form onSubmit={(e)=>handleSubmit(e)} className='mt-6 w-full sm:max-w-md'>
                        <p>Email</p>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='hello@gmail.com' className='border-b w-full border-gray-200' />
                        <p className='mt-7'>Password</p>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder='helloprem' className='border-b w-full  border-gray-200 mb-7' />
                        <button type='submit' className='w-full bg-primary text-white py-2 rounded '>Login</button>
                    </form>
            </div>
        </div>
    )
}

export default Login
