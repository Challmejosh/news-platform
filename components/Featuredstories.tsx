"use client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Mtn from "../public/mtn.svg"
import Domino from "../public/domino.svg"
import { StoryType } from "@/utils/types"

const FeaturedStories = () => {
    const [featuredStories,setFeaturedStories] = useState<StoryType[]>([])
    const featured = async ()=>{
        // const res = await fetch("https://api.agcnewsnet.com/api/general/stories/featured-stories?page=1&per_page=15")
        const res = await fetch("https://api.agcnewsnet.com/api/general/top-stories")
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        return res.json()
    }   
    const {data,error,isLoading} = useQuery({
        queryFn: featured,
        queryKey: ["feature"]
    })
    useEffect(()=>{
        if(data){
            setFeaturedStories(data.data.data)
        }
        if(error){
            console.log(error)
        }
    },[data,error])
    return ( 
        <div className="p-4 space-y-5 sm:p-8">
            <h2 className="uppercase font-bold text-2xl border-l-3 border-l-[#813D97] p-2 ">Featured Stories &gt; </h2>
            {isLoading ? (
                <div className="relative h-[700px] flex flex-col items-center justify-start gap-6 animate-pulse">
                    <div className="bg-gray-300 rounded-[2px] w-full h-[290px]" />
                    <div className="flex flex-col items-start justify-start gap-3 p-2 w-full">
                        <div className="flex flex-col gap-3 items-start justify-center py-2 border-b border-b-[#C8C8C8] w-full">
                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                        <div className="flex items-center justify-start gap-3 w-full">
                            <div className="flex gap-1 items-center">
                            <div className="w-[10px] h-[10px] rounded-full bg-gray-400" />
                            <div className="h-4 bg-gray-300 rounded w-16" />
                            </div>
                            <div className="flex gap-1 items-center">
                            <div className="w-[10px] h-[10px] rounded-full bg-gray-400" />
                            <div className="h-4 bg-gray-300 rounded w-20" />
                            </div>
                        </div>
                        </div>

                        <div className="flex flex-col gap-1 items-start justify-center w-full">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-start justify-start gap-1 w-full">
                            <div className="h-4 bg-gray-300 rounded w-5/6" />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            ):(
                <>
                    {featuredStories.length>0?(
                        <div className="grid grid-cols-1 sm:grid-cols-[repeat(1,minmax(300px,450px))] lg:grid-cols-[repeat(3,minmax(300px,450px))] items-start justify-center gap-3 ">
                            {featuredStories?.slice(0,2)?.map(story=>(
                                <Link href={`/stories/${story.id}`} className="relative h-[700px] flex flex-col items-center justify-start gap-6 " key={story.id}>
                                    <Image src={story.story.banner_image} alt={story.story.banner_image} width={250} height={200} className="rounded-[2px] w-full h-[290px] object-fill object-center" />
                                    <div className="flex flex-col items-start justify-start gap-3 p-2 ">
                                        <div className="flex flex-col gap-3 items-start justify-center py-2 border-b border-b-[#C8C8C8] ">
                                            <p className=" line-clamp-2 md:line-clamp-3 font-semibold text-[#282828] text-lg sm:text-2xl ">
                                                {story.story.description}
                                            </p>
                                            <div className="text-sm flex items-center justify-start gap-1  ">
                                                <div className="flex gap-1 items-center justify-start ">
                                                    <p className="w-[10px] h-[10px] rounded-full bg-[#F52A32] " />
                                                    <p className="capitalize">{story.story.author}</p>
                                                </div>
                                                <div className="flex gap-1 items-center justify-start ">
                                                    <p className="w-[10px] h-[10px] rounded-full bg-[#F52A32] " />
                                                    <p className="">{story.story.created_at.split("T")[0]}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 items-start justify-center  ">
                                            {[1,2,3,4,5].map((item,index:number)=>(
                                                <div className="flex items-start justify-start gap-1"key={index}>
                                                    {/* <p className="w-[15px] h-[12px] bg-[#F52A32] rounded-sm " /> */}
                                                    <p className="line-clamp-3 lg:line-clamp-2 font-medium   ">{story?.story.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            <div className="flex flex-col items-start justify-center gap-3 ">
                                <Image src={Mtn} alt={Mtn} width={250} height={200} className="w-full h-full" />
                                <Image src={Domino} alt={Domino} width={250} height={200} className="w-full h-full" />
                            </div>
                        </div>
                    ):(
                        "coming soon..."
                    )}
                </>
            )}
        </div>
     );
}
 
export default FeaturedStories;