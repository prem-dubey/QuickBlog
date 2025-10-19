import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { UseAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

// removed dummy comments; now using API data only

// --- RECURSIVE COMMENT COMPONENT ---
const CommentItem = ({ comment, allComments, addReply, handleUpvote }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  // no name field; server derives from token

  const replies = allComments
    .filter(c => c.parent_id && String(c.parent_id) === String(comment._id))
    .sort((a, b) => b.upvotes - a.upvotes) // sort replies by upvotes descending

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if (!replyContent.trim()) {
      toast.error("Please write a reply.")
      return
    }

    addReply(comment._id, replyContent)
    setReplyContent('')
    setShowReplyForm(false)
  }

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm p-4 transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img src={assets.user_icon} alt="" className="w-6 h-6" />
        <span className="font-semibold text-gray-800">{comment.name}</span>
        <span className="text-xs text-gray-400 ml-auto">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Body */}
      <div className="mt-2 text-sm text-gray-700 leading-relaxed pl-9">
        {comment.content}
      </div>

      {/* Actions */}
      <div className="pl-9 mt-3 flex items-center gap-4">
        <button
          className="text-xs text-primary font-medium hover:underline"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>

        <button
          onClick={() => handleUpvote(comment._id)}
          className="text-xs text-gray-600 flex items-center gap-1 hover:text-primary"
        >
          <img src={assets.like_icon} alt="upvote" className="w-4 h-4" />
          <span>{comment.upvotes}</span>
        </button>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <form
          onSubmit={handleReplySubmit}
          className="pl-9 mt-3 flex flex-col gap-2"
        >
          {/* name removed, derived from token */}
          <textarea
            placeholder="Write a reply..."
            className="w-full p-2 border border-gray-300 rounded text-sm h-24"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded px-4 py-1 text-sm w-fit hover:scale-105 transition-all"
          >
            Post Reply
          </button>
        </form>
      )}

      {/* Replies */}
      {replies.length > 0 && (
        <details open className="pl-9 mt-4 space-y-4 border-l-2 border-primary/20 bg-gray-50/60 rounded-md">
          <summary className="text-xs text-gray-500 cursor-pointer select-none">{replies.length} repl{replies.length>1?'ies':'y'}</summary>
          {replies.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              allComments={allComments}
              addReply={addReply}
              handleUpvote={handleUpvote}
            />
          ))}
        </details>
      )}
    </div>
  )
}

// --- MAIN BLOG COMPONENT ---
const Blog = () => {
  const { id } = useParams()
  const { axios } = UseAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.sucess ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data: resp } = await axios.post('/api/blog/comments', { blogId: id })
      resp.sucess ? setComments(resp.comments) : toast.error(resp.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // --- Add New Comment ---
  const addComment = async (e) => {
    e.preventDefault()
    try {
      const { data: resp } = await axios.post('/api/blog/add-comment', { blog: id, content, parent_id: null })
      if (resp.sucess) {
        // Don't add to UI immediately - comment goes to approval queue
        toast.success("Comment submitted for approval")
        setContent('')
      } else {
        toast.error(resp.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // --- Add Reply ---
  const addReply = async (parentId, replyContent) => {
    try {
      const { data: resp } = await axios.post('/api/blog/add-comment', { blog: id, content: replyContent, parent_id: parentId })
      if (resp.sucess) {
        // Don't add to UI immediately - reply goes to approval queue
        toast.success("Reply submitted for approval")
      } else {
        toast.error(resp.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // --- Handle Upvote ---
  const handleUpvote = async (commentId) => {
    try {
      const { data: resp } = await axios.post('/api/blog/upvote', { id: commentId })
      if (resp.sucess) {
        setComments(prev =>
          prev
            .map(c =>
              String(c._id) === String(commentId) ? { ...c, upvotes: resp.upvotes } : c
            )
            .sort((a, b) => b.upvotes - a.upvotes)
        )
      } else {
        toast.error(resp.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  return data ? (
    <div className="relative">
      <img src={assets.gradientBackground} alt="" className="absolute -top-50 -z-1" />
      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20">
        <p className="text-primary text-md py-4">
          published on {new Date(data.createdAt).toDateString()}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-5xl max-w-2xl font-semibold mx-auto">
          {data.title}
        </h1>
        <p className="my-5 truncate max-w-lg mx-auto">{data.subTitle}</p>
        <p className="inline-block py-1 px-4 rounded-full mb-6 text-sm border-primary/35 bg-primary/5 font-medium text-primary">
          Piyush Dubey
        </p>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        <img src={data.image} alt="thumbnail" className="rounded-2xl mb-10" />
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="rich-text max-w-3xl my-10 mt-6 md:mx-auto"
        ></div>
      </div>

      {/* Comments Section */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <p className="font-semibold mb-5 text-lg">Comments ({comments.length})</p>

        <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
          {comments
            .filter(comment => !comment.parent_id)
            .sort((a, b) => b.upvotes - a.upvotes)
            .map(topLevel => (
              <CommentItem
                key={topLevel._id}
                comment={topLevel}
                allComments={comments}
                addReply={addReply}
                handleUpvote={handleUpvote}
              />
            ))}
        </div>
      </div>

      {/* Add New Comment */}
      <div className="max-w-3xl mx-auto">
        <p className="font-semibold mb-4 text-lg">Add your comment</p>
        <form onSubmit={addComment} className="flex flex-col items-start gap-4 max-w-lg">
          {/* Name removed; server derives from token */}
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Comment"
            className="h-40 w-full p-2 border border-gray-300 rounded outline-none"
            value={content}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Share Buttons */}
      <div className="my-24 max-w-3xl mx-auto">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex gap-3">
          <img src={assets.facebook_icon} alt="" className="cursor-pointer hover:opacity-80" />
          <img src={assets.twitter_icon} alt="" className="cursor-pointer hover:opacity-80" />
          <img src={assets.googleplus_icon} alt="" className="cursor-pointer hover:opacity-80" />
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  )
}

export default Blog


