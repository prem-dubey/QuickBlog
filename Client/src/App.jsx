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
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { UseAppContext } from './context/AppContext.jsx'

function App() {
  const {token} = UseAppContext();

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog/>}/>
        <Route path='/admin' element={token ? <Layout/> : <Login/>}> {/* How to create child routes see here  */}
          <Route index element={<Dashboard/>} />
          <Route path='addBlog' element={<AddBlog/>} />
          <Route path='listBlog' element={<ListBlog/>} />
          <Route path='comments' element={<Comment/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
