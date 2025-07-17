"use client"

import StoryCard from "@/components/StoryCard";
import StoryCardSkeleton from "@/components/StoryCardSkeleton";
import { MiniStoryType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const params = useParams()
    const [stories,setStories] = useState<MiniStoryType[]>([])
    const getCategory = async ()=>{
        const res = await fetch(`https://api.agcnewsnet.com/api/general/categories/${params.categoryId}/stories?page=1&per_page=15`)
        if(!res.ok){
            throw new Error("failed to fetch")
        }
        return res.json()
    }
    const {data,error,isLoading} = useQuery({
        queryKey: ["category-posts"],
        queryFn: getCategory
    })
    useEffect(()=>{
        if(data){
            setStories(data.data.data)
        }
        if(error){
            console.log(error)
        }
    },[data,error])
    if(isLoading){
        return <StoryCardSkeleton />
    }
    return ( 
        <div className="w-full flex flex-col items-center justify-center ">
            {stories&&stories.length>0&&(
                <>
                    <h2 className="uppercase font-bold text-2xl border-l-3 border-l-[#813D97] p-2 ">
                        {stories[0].category.category_name}
                    </h2>
                    <StoryCard 
                    stories={stories}
                    />
                </>
            )}
            {stories.length<0&&(
                <div className="">
                    coming soon....
                </div>
            )}
        </div>
     );
}
 
export default Page;