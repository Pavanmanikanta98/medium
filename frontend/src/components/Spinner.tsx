export const Spinner = () => {
    return <>
    <div className="flex items-center justify-center items-start min-h-screen pb-30">
      <div className="flex flex-col bg-white rounded-xl ">
        <div className="flex justify-center items-center">
          <div className="animate-spin h-12 w-12 border-4 border-gray-600 rounded-full inline-block size-10 border-[3px] border-current border-t-transparent"></div>
        </div>
        <div className="mt-4 text-black-400 dark:text-black-300">Loading...</div>
      </div>
    </div>
    </>
}