import { blogState } from "../state/atom";
import { WarningCard } from "./WarningCard";
import { useRecoilValue } from "recoil";
import { ChangeEvent, useState } from "react";
import { UpdateBlogInput } from "@pavan098/blog-validation";
import axios from "axios";
import { BACKEND_URL } from "../pages/config";
import { useNavigate } from "react-router-dom";
import { Appbar } from "./Appbar";



export const UpdateBlog =()=>{

    const navigate = useNavigate();
    const [isUpdate, setisUpdate] = useState(false);
    const blogStateValue = useRecoilValue(blogState);
    const [showWarning, setShowWarning] = useState(false);
    const [blogUpdate, setblogUpdate] = useState<UpdateBlogInput>({
        id:blogStateValue.id,
        thumbnail:blogStateValue.thumbnail,
        content: blogStateValue.content,

    })

    const sendRequest = () => {

        if (!blogUpdate.thumbnail || !blogUpdate.content) {
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 4000);
          return;
        }
    
        if (blogStateValue) {
          // Update existing blog
          setisUpdate(true)
        
          axios
              .put(`${BACKEND_URL}/api/v1/blog`, blogUpdate, {
                headers: {
                    Authorization: localStorage.getItem("token")
                  }
              })
              .then((response) => {
                  console.log('Blog post successfully updated:', response.data);
                  setisUpdate(false);
                  navigate(`/blog/${response.data.id}`);
              })
              .catch((error) => {
                  console.error('Error updating blog post:', error);
              });
    
    
            }
      };
    
      return (
        <div className="h-full">
          <Appbar />
          <div className="flex justify-center w-full">
            <div className="pt-7 max-w-screen-lg w-full">
              <label className="block mb-2 text-6xl font-light text-gray-900 pl-3 italic font-sans">Title</label>
              <input
                type="text"
                value={blogUpdate.thumbnail}
                className="block w-full p-4 text-white-900 border border-white-300 rounded-lg bg-white-50 text-base focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  setblogUpdate((c) => ({
                    ...c,
                    thumbnail: e.target.value
                  }))
                }}
                required />
              <label className="block mb-2 text-6xl font-light text-gray-900 pl-3 italic font-sans py-4">Tell your story</label>
    
              <TextInput valueField={blogUpdate.content} onChange={(e) => {
                setblogUpdate((c) => ({
                  ...c,
                  content: e.target.value
                }))
              }} />
            
    
              <button
                className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={sendRequest} >
                { isUpdate ? "Updating..." :  " Update"}
              </button>
            </div>
    
    
            {showWarning && (
                <WarningCard message={`"Inconsistent data will not be Update."`} />
              )}
    
    
          </div>
    
    
    
        </div>
    
      );
    };
    
    
    function TextInput({ onChange, valueField }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, valueField: string }) {
      return <div>
    
        <div>
          <div className="w-full mb-4  ">
            <div className="flex items-center justify-between w-full ">
              <div className="w-full">
    
                <textarea onChange={onChange} rows={15} className="block w-full px-1 py-3 border-3 text-md text-white-900 border border-white-300 rounded-lg bg-white-50 text-base focus:ring-blue-500 focus:border-blue-500 " placeholder="Write an article..." value={valueField} required />
              </div>
            </div>
    
          </div>
    
        </div>
    
      </div>
    }
