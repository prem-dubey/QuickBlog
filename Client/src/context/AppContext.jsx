import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate()

    const [token , setToken ] = useState(null);
    const [blog , setBlog ] = useState([]);
    const [isAdmin , setIsAdmin ] = useState(false);
    const [input , setInput ] = useState('');

    const fetchBlogs = async ()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            data.sucess ? setBlog(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token');
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
        const storedIsAdmin = localStorage.getItem('isAdmin');
        setIsAdmin(storedIsAdmin === 'true');
    },[])

    const value = {
        axios , navigate , token , setToken , blog , setBlog , input , setInput , isAdmin , setIsAdmin 
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const UseAppContext = ()=>{
    return useContext(AppContext)
}