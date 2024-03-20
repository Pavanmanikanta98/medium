import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { BACKEND_URL } from "./config";
import { Appbar } from "../components/Appbar";
import { CreateBlogInput } from "@pavan098/blog-validation";
import { WarningCard } from "../components/WarningCard";

export const Publish = () => {
  const navigate = useNavigate();
 
 
  const [blogInputs, setblogInputs] = useState<CreateBlogInput>({
    thumbnail: "",
    content: "",
    picture: ""

  })
  const [showWarning, setShowWarning] = useState(false);


  const sendRequest = () => {

    if (!blogInputs.thumbnail || !blogInputs.content) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 4000);
      return;
    }
 

    axios.post(`${BACKEND_URL}/api/v1/blog`, blogInputs, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(response => {
        console.log("Blog post successfully published:", response.data);
        navigate(`/blog/${response.data.id}`)
        // Reset title and content fields after successful submission if needed

      })
      .catch(error => {
        console.error("Error publishing blog post:", error);
      });
    
  };

  return (
    <div className="h-full">
      <Appbar />
      <div className="flex justify-center w-full">
        <div className="pt-7 max-w-screen-lg w-full">
          <label className="block mb-2 text-6xl font-light text-gray-900 pl-3 italic font-sans">Title</label>
          <input
            type="text"
            value={blogInputs.thumbnail}
            className="block w-full p-4 text-white-900 border border-white-300 rounded-lg bg-white-50 text-base focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => {
              setblogInputs((c) => ({
                ...c,
                thumbnail: e.target.value
              }))
            }}
            required />
          <label className="block mb-2 text-6xl font-light text-gray-900 pl-3 italic font-sans py-4">Tell your story</label>

          <TextInput valueField={blogInputs.content} onChange={(e) => {
            setblogInputs((c) => ({
              ...c,
              content: e.target.value
            }))
          }} />
        

          <button
            className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={sendRequest} >
           Publish
          </button>
        </div>


        {showWarning && (
            <WarningCard message={`"Inconsistent data will not be published."`} />
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


// function WarningCard({ message }:{message: string }) {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//       <div className="bg-red-700 text-white rounded-lg p-4">
//         <p>{message}</p>
//       </div>
//     </div>
//   ); }

