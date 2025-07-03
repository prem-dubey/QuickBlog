import React, { useState } from 'react'
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const {axios , setToken} = UseAppContext();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/admin/login' , {email , password});

            if(data.sucess){
                setToken(data.token);
                localStorage.setItem('token',data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
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
                    <h1 className='text-3xl font-bold mx-auto'><span className='text-primary'>Admin</span>Login</h1>
                    <p className='text-gray-500 font-light mx-auto'>Enter your credentials to acess the admin pannel</p>
                </div>
                    <form onSubmit={(e)=>handleSubmit(e)} className='mt-6 w-full sm:max-w-md'>
                        <p>Email</p>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='your email id' className='border-b w-full border-gray-200' />
                        <p className='mt-7'>Password</p>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="text" placeholder='your password' className='border-b w-full  border-gray-200 mb-7' />
                        <button type='submit' className='w-full bg-primary text-white py-2 rounded '>Login</button>
                    </form>
            </div>
        </div>
    )
}

export default Login
