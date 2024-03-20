import { useEffect, useState } from "react"
import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avator } from "./BlogCard"
import { useRecoilState, useRecoilValue } from "recoil"
import { authState, blogState } from "../state/atom"

import DeleteBlog from "./DeleteBlog"
import { useNavigate } from "react-router-dom"


export const FullBlog = ({ blog }: { blog: Blog | undefined }) => {
    const navigate = useNavigate();
    const [isAuthor, setisAuthor ]=useState(false)
    const [blogStateValue, setBlogStateValue] = useRecoilState(blogState);
    const auth = useRecoilValue(authState)
   if(blog) {

    useEffect(()=>{
    //     console.log(auth.user?.username )

    // console.log(blog.author.username)
    
 
    if(auth.user?.username === blog.author.username){
    //   console.log("ghjk")
      setisAuthor(true)
    }

    },[blog])
    

function handleUpdateClick(){
    if(blog){
        setBlogStateValue(blog);
    }
   
    console.log(blogStateValue)
    // Navigate to the Publish page
    navigate('/update');

}
    return <div>
        <Appbar />

        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-10">
                <div className="col-span-8 ">
                    <div className="text-5xl font-extrabold">
                        {blog.thumbnail}

                    </div>
                    <div className="text-slate-400 pt-2">
                        posted on 2nd Dec 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>

                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-xl">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avator size="big" name={blog.author.username} />

                        </div>
                        <div>
                            <div className="font-bold text-3xl pt-2">
                                {blog.author.username}
                            </div>
                            <div className="text-slate-400 pt-2">
                                blog is related to nothing. note:-  here, nothing means nothing, not about the nothing brand phones
                            </div>
                            <div>
                                {isAuthor && (
                                    <div className="pt-6">
                                    <button className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        // className="mt-4 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={handleUpdateClick}>
                                        Update
                                    </button>
                                      <DeleteBlog id={blog.id} />
                                    {/* <button type="button" className="ml-5 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete</button> */}
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
    }
}


