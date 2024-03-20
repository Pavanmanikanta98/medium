import { Link } from "react-router-dom"
import { Avator } from "./BlogCard"

export const Appbar =() =>{
    return <div className="border-b flex justify-between px-10 py-8">
        
          <Link to={"/blogs"} className="flex justify-center flex-col cursor-pointer text-2xl ml-10">
            DevBlogs
           </Link>
        
      <div className="mr-12">
      <Link to={"/publish"} className=" mr-7 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">New </Link>
      <Avator size={"big"} name="Pavan" />

      </div>
       

    </div>
}