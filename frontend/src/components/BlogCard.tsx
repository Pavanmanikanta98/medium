import { Link } from "react-router-dom"

interface blogCardProps{
    authorName: string,
    thumbnail: string,
    content : string,
    publishedDate : string,
     id : number
}
export const BlogCard =({ 
     id,
     authorName,
     thumbnail,
     content,
    publishedDate

    }:blogCardProps)=>{

    return <Link to={`/blog/${id}`}> 
    <div className="p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-screen max-w-screen-md">
        <div className="flex">
             <div className=""> <Avator name={authorName} />  </div>
        <div className="font-light text-slate-700 px-2 text-sm flex justify-center flex-col">  {authorName} </div>  
        <div className="flex justify-center flex-col"> <Circle/>  </div>
         <div className="font-thin text-slate-600 pl-2 text-sm flex justify-center flex-col">   {publishedDate}   </div>
        </div>
        <div className="text-xl font-semibold text-xl pt-2">
            {thumbnail}
        </div>
        
        <div className="text-md font-light text-base text-slate-500 pt-1">
            {content.length > 143 ? content.slice(0,145)+"...": content}
        </div>
        <div  className="text-slate-500 text-sm font-thin pt-2">
            {`${Math.ceil(content.length/150) } Minute(s)     Read`}
        </div>

       
    </div>
    </Link>
}

function Circle(){
    return <div className=" rounded-full bg-gray-400 w-1 h-1">

    </div>
}


 export function Avator( { name , size="small" }: { name:string ,size? : "small" | "big"}){
return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600  ${size === "small"? "w-5 h-5" : "w-9 h-9" } `}>
    <span className={`font-medium text-gray-600 dark:text-gray-300 ${size === "small" ? "text-sm" : "text-xl"}`}>{name[0].toUpperCase() }</span>
</div>

}