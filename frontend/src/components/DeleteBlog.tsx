import { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../pages/config';
import { useNavigate } from 'react-router-dom';



const DeleteBlog = ({ id }:{ id: Number}) => {

    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false);
  
    const handleDelete = async () => {
      try {
        setIsDeleting(true);
       
         const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
         });
         if(response.status === 200){
            navigate("/blogs")
         }

        
      } catch (error) {
        console.error('Failed to delete the blog post:', error);
      } finally {
        setIsDeleting(false);
      }
    };
  
    return (
      <button onClick={handleDelete} disabled={isDeleting} className='ml-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    );
  };
  
  export default DeleteBlog;