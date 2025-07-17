"use client"

import { StoryType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"


const TopStories = () => {
    const [topStories,setTopStories] = useState<StoryType[]>([])
    const getStories = async ()=>{
        const res = await fetch("https://api.agcnewsnet.com/api/general/top-stories")
        if(!res.ok){
            throw new Error("Failed to fetch")
        }
        return res.json()
    }
    const {data, error, isLoading} = useQuery({
        queryKey: ["top-stories"],
        queryFn: getStories
    })
    useEffect(()=>{
        if(data){
            setTopStories(data.data.data)
        }
    },[data,error])
    if(error){
        return null
    }
    return ( 
        <div className="p-4 sm:p-8 ">
            <h2 className="uppercase text-[28px] font-bold p-6 ">top stories</h2>
            <div className="w-full flex flex-col gap-3 ">
                {isLoading ? (
                    <div className="flex flex-col lg:flex-row text-black lg:text-white items-start justify-center gap-3 w-full">
                        <div className="lg:relative h-full lg:h-[348px] flex flex-col gap-3 items-start justify-start w-full lg:w-1/2 animate-pulse bg-gray-200 rounded-[2px]">
                            <div className="w-full h-[200px] bg-gray-300 rounded-[2px]"></div>
                            <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4">
                                <div className="h-4 w-24 bg-gray-300 mb-2 rounded"></div>
                                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 h-full lg:h-[348px] flex flex-col gap-3 items-start justify-start">
                            <div className="w-full h-full lg:h-1/2 flex flex-col lg:flex-row items-start justify-start gap-3">
                                {[1, 2].map((_, index) => (
                                    <div key={index} className="lg:relative flex items-start justify-start gap-2 h-[107px] sm:h-[180px] lg:h-full w-full rounded-sm animate-pulse bg-gray-200">
                                        <div className="w-[50%] lg:w-full h-full bg-gray-300 rounded-[2px]"></div>
                                        <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4">
                                            <div className="h-4 w-20 bg-gray-300 mb-2 rounded"></div>
                                            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="lg:relative w-full h-full lg:h-1/2 animate-pulse bg-gray-200 rounded-[2px]">
                                <div className="h-full w-full bg-gray-300 rounded-[2px]"></div>
                                <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4">
                                    <div className="h-4 w-24 bg-gray-300 mb-2 rounded"></div>
                                    <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                ):(
                    <>
                        {topStories.length>0&&
                            <div className="flex flex-col lg:flex-row text-black lg:text-white items-start justify-center gap-3 w-full ">
                                <Link href={`/stories/${Number(topStories[0].id)}`} className="lg:relative h-full lg:h-[348px] flex flex-col gap-3 items-start justify-start w-full lg:w-1/2 ">
                                    <Image src={topStories[0]?.story?.banner_image} alt={topStories[0]?.story?.banner_image} width={250} height={200} className="rounded-[2px] w-full h-full object-fill lg:object-center " />
                                    <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4 ">
                                        <h2 className="text-[#F85FD0] uppercase text-sm font-semibold ">latest post</h2>
                                        <p className=" font-semibold text-2xl ">{topStories[0]?.story.description}</p>
                                    </div>
                                </Link>
                                <div className="w-full lg:w-1/2 h-full lg:h-[348px] flex flex-col gap-3 items-start justify-start ">
                                    <div className="w-full h-full lg:h-1/2 flex flex-col lg:flex-row items-start justify-start gap-3 ">
                                        {topStories?.slice(1,3)?.map(story=>(
                                            <Link href={`/stories/${Number(story.id)}`} className="lg:relative flex items-start justify-start gap-2 h-[107px] sm:h-[180px] lg:h-full w-full rounded-sm "key={story.id}>
                                                <Image src={story.story.banner_image} alt={story.story.banner_image} width={250} height={200} className="rounded-[2px] w-[50%] lg:w-full h-full object-fill lg:object-cover object-center " />
                                                <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4 ">
                                                    <h2 className="text-[#F85FD0] uppercase text-sm font-semibold ">news today</h2>
                                                    <p className="line-clamp-3 lg:line-clamp-2 font-semibold lg:text-lg ">{story?.story.description}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link href={`/stories/${Number(topStories[2].id)}`} className="lg:relative w-full h-full lg:h-1/2 ">
                                        <Image width={250} height={200} src={topStories[2]?.story?.banner_image} alt={topStories[2]?.story?.banner_image}  className="rounded-[2px] h-full w-full object-cover object-center " />
                                        <div className="lg:absolute lg:bottom-0 w-full p-2 sm:p-4 ">
                                            <h2 className="text-[#F85FD0] uppercase text-sm font-semibold ">latest post</h2>
                                            <p className=" font-semibold text-2xl ">{topStories[2]?.story.description}</p>
                                        </div>
                                    </Link>
                        
                                </div>
                            </div>
                        }
                    </>
                )}
            </div>
        </div>
     );
}
 
export default TopStories;