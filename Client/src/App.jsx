import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import Layout from './pages/admin/Layout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import AddBlog from './pages/admin/AddBlog.jsx'
import ListBlog from './pages/admin/ListBlog.jsx'
import Comment from './pages/admin/Comment.jsx'
import Login from './components/admin/Login.jsx'
import Register from './components/admin/Register.jsx'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { UseAppContext } from './context/AppContext.jsx'

function App() {
  const {token, isAdmin} = UseAppContext();

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path='/admin' element={token && isAdmin ? <Layout/> : <Login/>}> {/* Only admin can access dashboard */}
          <Route index element={<Dashboard/>} />
          <Route path='addBlog' element={<AddBlog/>} />
          <Route path='listBlog' element={<ListBlog/>} />
          <Route path='comments' element={<Comment/>} />
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
    </div>
  )
}

export default App
