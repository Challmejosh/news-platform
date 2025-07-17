import { toggleBookmark } from "@/lib/redux/slice/bookmarkSlice";
import { MiniStoryType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const OneCategoryPost = ({id: categoryId}:{id:number}) => {
    const [story,setStory] = useState<MiniStoryType|null>(null)
    const dispatch = useDispatch()
    const getCategoryPost = async()=>{
        const res = await fetch(`https://api.agcnewsnet.com/api/general/categories/${categoryId}/stories?page=1&per_page=15`)
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        return res.json()
    }
    const {data,error, isLoading} = useQuery({
        queryFn: getCategoryPost,
        queryKey:["one-post"]
    })
    useEffect(()=>{
        if(data){
            setStory(data.data.data[0])
        }
        if(error){
            console.log(error)
        }
    },[data,error])
    if(isLoading){
        return (
            <div className="border-y border-y-[#C8C8C8] text-[#5A5A5A] flex flex-col lg:flex-row items-start justify-center gap-4 animate-pulse">
                <div className="relative flex flex-col items-start justify-start gap-2 h-full border-r border-r-[#C8C8C8] w-full rounded-sm ">
                    <div className="absolute top-3 right-3 bg-gray-300 rounded-full w-6 h-6" />
                    
                    <div className="w-full bg-gray-300 rounded-[2px] h-[200px] lg:h-[300px]" />

                    <div className="w-full flex flex-col gap-3 items-start justify-start p-2 sm:p-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                        <div className="h-5 bg-gray-300 rounded w-1/2" />
                        <div className="flex items-center justify-start gap-1">
                            <div className="w-[10px] h-[10px] bg-gray-300 rounded-full" />
                            <div className="h-4 bg-gray-300 rounded w-24" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-start justify-start w-full">
                    <div className="flex flex-col gap-5 items-start justify-start w-full">
                        {[1,2,3,4,5].map((item, index) => (
                            <div className="flex items-start justify-start gap-1 w-full" key={index}>
                                <div className="w-[15px] h-[12px] bg-gray-300 rounded-sm" />
                                <div className="h-4 bg-gray-300 rounded w-1/2" />
                                <div className="rounded-[2px] hidden lg:block w-[168px] h-[92px] bg-gray-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return ( 
        <>
            {story&&(
                <div className="w-full border-y p-1 border-y-[#C8C8C8] text-[#5A5A5A] flex flex-col lg:flex-row items-start justify-center gap-4">
                    <div  className="relative flex flex-col items-start p-1 justify-start gap-2 h-full lg:border-r lg:border-r-[#C8C8C8] w-full ">
                        <Bookmark className="cursor-pointer text-black absolute top-3 right-3" onClick={()=>dispatch(toggleBookmark(story))}  />
                        <Link href={`/stories/${story.id}`} className="w-full">
                            <Image src={story?.banner_image} alt={story.banner_image} width={250} height={200} className="rounded-[2px] w-full h-full object-fill lg:object-cover object-center " />
                        </Link>
                        <div className=" w-full flex flex-col gap-3 items-start justify-start p-2 sm:p-4 ">
                            <p className="line-clamp-3 text-black lg:line-clamp-2 font-semibold text-lg lg:text-[28px] ">{story.description}</p>
                            <p className="line-clamp-3 lg:line-clamp-2 font-medium lg:text-lg ">{story.subtitle}</p>
                            <div className="flex items-center justify-start gap-1 ">
                                <p className="w-[10px] h-[10px] bg-[#F52A32] rounded-full " />
                                <p className="text-sm">{story.author}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-start justify-start ">
                        <div className=" flex flex-col gap-5 items-start justify-start ">
                            {[1,2,3,4,5].map((item,index:number)=>(
                                <div className="flex items-start justify-start gap-1"key={index}>
                                    <p className="w-[15px] h-[12px] bg-[#F52A32] rounded-sm " />
                                    <p className="line-clamp-3 lg:line-clamp-2 font-medium   ">{story.description}</p>
                                    <Image src={story?.banner_image} alt={story.banner_image} width={250} height={200} className="rounded-[2px] hidden lg:block w-[168px] h-[92px] object-fill lg:object-cover object-center " />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
     );
}
 
export default OneCategoryPost;
