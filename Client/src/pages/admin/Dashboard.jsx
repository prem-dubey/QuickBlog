import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import { col } from 'motion/react-client'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { UseAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const {axios} = UseAppContext();

  const fetchDashboard = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard');
      data.sucess ? setDashboardData(data.dashboardData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }


  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 '>
      <div className='flex gap-6 flex-wrap'>
        <div className='flex bg-white p-4 rounded w-full max-w-70 gap-5 items-center shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-gray-600 font-semibold text-xl'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>
        <div className='flex bg-white p-4 rounded w-full max-w-70 gap-5 items-center shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-gray-600 font-semibold text-xl'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>
        <div className='flex bg-white p-4 rounded w-full max-w-70 gap-5 items-center shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-gray-600 font-semibold text-xl'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='mt-6 flex gap-5 items-center m-4 '>
          <img src={assets.dashboard_icon_4} alt="" />
          <p className='font-semibold text-gray-900 text-xl'>Latest Blogs</p>
        </div>
        {/* for table */}
        <div className='relative max-w-4xl rounded-lg scrollbar-hide overflow-x-auto shadow bg-white '>
          <table className='w-full text-gray-500 text-sm'>
            <thead className='text-xs text-gray-500 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6 '>#</th>
                <th scope='col' className='px-2 py-4 '>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4 '>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {dashboardData.recentBlogs.map((blog,index)=>{
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1} />
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
