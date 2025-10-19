import React, { useState } from 'react'
import { UseAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Register = () => {
    const {axios , navigate} = UseAppContext();
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/user/register' , {name , email , password});
            if(data.sucess){
                toast.success('Registered successfully. Please login');
                navigate('/login');
            }
            else{
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
                    <h1 className='text-3xl font-bold mx-auto'><span className='text-primary'>User</span> Register</h1>
                    <p className='text-gray-500 font-light mx-auto'>Create your account</p>
                </div>
                    <form onSubmit={(e)=>handleSubmit(e)} className='mt-6 w-full sm:max-w-md'>
                        <p>Name</p>
                        <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder='John Doe' className='border-b w-full border-gray-200' />
                        <p className='mt-7'>Email</p>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder='hello@gmail.com' className='border-b w-full border-gray-200' />
                        <p className='mt-7'>Password</p>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='••••••••' className='border-b w-full  border-gray-200 mb-7' />
                        <button type='submit' className='w-full bg-primary text-white py-2 rounded '>Register</button>
                    </form>
            </div>
        </div>
    )
}

export default Register


