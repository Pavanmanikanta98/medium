import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"



 export const Blogs = ()=>{
    const { loading,blogs} = useBlogs();

     if(loading){
        return<div className="">
            <Appbar />
             <div className="flex justify-center ">
                <div className="w-screen max-w-screen-md">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />

                </div>
            
        </div>
        </div>
        
    }
     return <div>
         <Appbar />
         <div className="flex justify-center ">
             <div className="">

                 {blogs.map(blog =>

                     <BlogCard
                         key={blog.id}
                         id={blog.id}
                         authorName={blog.author.username}
                         thumbnail={blog.thumbnail}
                         content={blog.content}
                         publishedDate="02/04/24" />

                 )}



             </div>
         </div>
     </div>
 }