"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import { MiniStoryType } from "@/utils/types"
const Story = ({id}:{id:number}) => {
    const [story,setStory] = useState<MiniStoryType|null>(null)
    const getStory = async (storyId: number)=>{
        const res = await fetch(`https://api.agcnewsnet.com/api/general/stories/${storyId}`)
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        return res.json()
    }
    const {data,error,isLoading} = useQuery({
        queryKey: ['story?'],
        queryFn:()=>getStory(id)
    })
    useEffect(() => {
        if(data){
            setStory(data.data)
        }
        if(error){
            console.log(error)
        }
    }, [data,error])
    return ( 
        <div className="w-full text-black p-4 sm:p-8 h-full flex items-center justify-center ">
            {isLoading?(
                <div className="bg-white shadow-md rounded-lg overflow-hidden w-full sm:w-[500px] lg:w-[700px] mx-auto animate-pulse">
                    <div className="w-full h-[400px] bg-gray-300" />

                    <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4" />
                        <div className="h-4 bg-gray-300 rounded w-1/2" />

                        <div className="h-4 bg-gray-300 rounded w-full" />
                        <div className="h-4 bg-gray-300 rounded w-11/12" />
                        <div className="h-4 bg-gray-300 rounded w-10/12" />

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-4 bg-gray-300 rounded w-9/12" />
                            <div className="h-4 bg-gray-300 rounded w-10/12" />
                            <div className="h-4 bg-gray-300 rounded w-8/12" />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-4 mt-4 gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <div className="h-3 bg-gray-300 rounded w-24"></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                <div className="h-3 bg-gray-300 rounded w-32"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ):(
                <>
                    {story?(
                        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full sm:w-[500px] lg:w-[700px]">
                            <Image 
                                src={story.banner_image} 
                                alt={story.title} 
                                width={800} 
                                height={400} 
                                className="w-full h-[400px] object-cover"
                            />

                            <div className="p-6 space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800">{story.title}</h2>
                                {story.subtitle && (
                                    <p className="text-lg text-gray-500">{story.subtitle}</p>
                                )}

                                <p className="text-gray-700 text-base">{story.description}</p>

                                <div 
                                    className="prose max-w-none text-gray-800"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(story.content) }}
                                />

                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t pt-4 mt-4 text-sm text-gray-500 gap-3">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <p className="capitalize">{story.author}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                        <p>{new Date(story.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ):(
                        "not found"
                    )}
                </>
            )}
        </div>
     );
}
 
export default Story;