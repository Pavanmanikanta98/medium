export const BlogSkeleton = () => {
    return (
      <div className="flex animate-pulse flex-col mb-9 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
       
    
        <div className=" mt-2 w-full flex items-center p-3"> {/* Added flex and items-center */}
          <span className="size-8 block bg-gray-200 rounded-full dark:bg-gray-500 mr-3"></span> {/* Added mr-2 for margin */}
          <h3 className="h-3 bg-gray-200 rounded-full dark:bg-gray-500 w-1/4"></h3>
        </div>
        <div className="w-full p-3">
        <ul className="mt-5 space-y-2">
          <li className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></li>
          <li className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></li>
          <li className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></li>
          <li className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-500"></li>
          <li className="w-1/4 h-3 bg-gray-200 rounded-full dark:bg-gray-500"></li>
        </ul>

        </div>
    
       
      </div>
    );
  };
  