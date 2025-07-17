"use client"

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { StoryType } from "@/utils/types";
import { CategoryType } from "./Hero";
import Link from "next/link";
import OneCategoryPost from "./oneCategoryPost";
const Category = () => {
    const [category,setCategory] = useState<CategoryType[]>([])
    
    const getCategory = async () => {
    const res = await fetch("https://api.agcnewsnet.com/api/general/categories");
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
    };

    // const getCategoryPost = async (categoryId: number) => {
    // const res = await fetch(`https://api.agcnewsnet.com/api/general/categories/${categoryId}/stories?page=1&per_page=15`);
    // if (!res.ok) throw new Error(`Failed to fetch posts for category ${categoryId}`);
    // return res.json();
    // };
    const { data, error,isLoading} = useQuery({
        queryKey: ["category"],
        queryFn: getCategory,
    });


    useEffect(() => {
        if (data) { 
            setCategory(data.data.data)
        }
        
        if (error) {
            console.error(error);
        }
    }, [data,error]);
    return ( 
        <div className="p-4 sm:p-8 h-full ">
            {isLoading?(
                <>
                    <div className="animate-pulse h-[20px] rounded-md w-[200px] " />
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
                </>
            ):(
                <>
                    {category&&category.length>0?(
                        <div className="flex flex-col gap-2 items-start justify-center w-full">
                            {category?.map(item=>(
                                <div className="w-full flex flex-col gap-5 items-start justify-center " key={item.category_id} >
                                    <Link href={`/category/${item.category_id}`} className="uppercase font-bold text-2xl border-l-3 border-l-[#813D97] p-2 ">{item.category_name} &gt; </Link>
                                    <OneCategoryPost id={item.category_id} />
                                </div>
                            ))}
                        </div>
                    ):(
                        <div className="h-[300px] w-full flex items-center justify-center">
                            coming soon...
                        </div>
                    )}
                </>
            )}
        </div>
     );
}
 
export default Category;