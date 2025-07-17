const StoryCardSkeleton = () => {
    return ( 
        <div className="relative h-[700px] flex flex-col items-center justify-start gap-6 animate-pulse">
            <div className="w-full bg-gray-300 rounded-[2px] h-[290px]" />

            <div className="absolute top-3 right-3 w-6 h-6 bg-gray-300 rounded-full" />

            <div className="flex flex-col items-start justify-start gap-3 p-2 w-full">
                <div className="flex flex-col gap-3 items-start justify-center py-2 border-b border-b-[#C8C8C8] w-full">
                    <div className="h-6 bg-gray-300 rounded w-3/4" />
                    <div className="h-6 bg-gray-300 rounded w-1/2" />

                    <div className="text-sm flex items-center justify-between w-full gap-1">
                        <div className="flex gap-1 items-center">
                            <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
                            <div className="h-4 bg-gray-300 rounded w-16" />
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="w-[10px] h-[10px] rounded-full bg-gray-300" />
                            <div className="h-4 bg-gray-300 rounded w-24" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default StoryCardSkeleton;