"use client"

import StoryCard from "@/components/StoryCard";
import { updateBookmark } from "@/lib/redux/slice/bookmarkSlice";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
    const bookmarks = useSelector((state:RootState)=>state.bookmark.bookmark)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(updateBookmark())
    },[dispatch])
    return ( 
        <div className="p-4 sm:p-8">
            <StoryCard 
            stories={bookmarks}
            />
        </div>
     );
}
 
export default Page;