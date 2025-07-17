"use client"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import crown  from "../public/crown.svg"
import { StoryType } from "@/utils/types"
import { Bookmark } from "lucide-react"
import { toggleBookmark } from "@/lib/redux/slice/bookmarkSlice"
import { useDispatch } from "react-redux"

const EditorsPick = () => {
    const [editor,setEditor] = useState<StoryType[]>([])
    const editorPick = async ()=>{
        const res = await fetch("https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=15")
        if(!res.ok){
            throw new Error("Error fetching data")
        }
        return res.json()
    }
    const {data,error,isLoading} = useQuery({
        queryKey:["editor"],
        queryFn: editorPick
    })
    useEffect(()=>{
        if(data){
            setEditor(data.data.data)
        }
        if(error){
            console.log(error)
        }
    },[data,error])
    const firstValidStory = editor.find(item => item.story !== null)
    const dispatch = useDispatch()
    return ( 
        <div className="p-4 sm:p-8 bg-[#F6F6F6] ">
            {isLoading?(
                <div className="flex flex-col lg:flex-row text-white items-start justify-center gap-4 animate-pulse">
                    <div className="relative flex flex-col items-start justify-start gap-2 h-full lg:h-[517px] w-full rounded-sm bg-slate-200">
                        <div className="rounded-[2px] w-full h-[250px] sm:h-[300px] lg:object-cover bg-slate-200" ></div>
                        <div className="lg:absolute lg:bottom-0 w-full flex flex-col gap-3 items-start justify-start p-2 sm:p-4">
                            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                            <div className="flex items-center justify-start gap-1">
                                <div className="w-[10px] h-[10px] bg-slate-200 rounded-full"></div>
                                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                            </div>
                        </div>
                        <div className="absolute top-3 left-5 flex gap-1 bg-[#0000005E] text-white p-1 px-2 text-sm items-center justify-center w-fit rounded-full">
                            <div className="bg-slate-200 p-1 w-[20px] h-[20px] rounded-full"></div>
                            <div className="h-4 bg-slate-200 rounded w-16"></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 items-start justify-start w-full">
                        <div className="h-5 bg-slate-200 rounded w-24"></div>
                        <div className="flex flex-col gap-5 items-start justify-start w-full">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="flex items-start justify-start gap-1 w-full">
                                    <div className="w-[15px] h-[12px] bg-slate-200 rounded-sm"></div>
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ):(
                <>
                    {firstValidStory ? (
                        <div className="flex flex-col lg:flex-row text-white items-start justify-center gap-4">
                            <div  className="relative flex flex-col items-start justify-start gap-2 h-full lg:h-[517px] w-full rounded-sm ">
                                <Bookmark className="cursor-pointer text-black absolute top-3 right-3" onClick={()=>dispatch(toggleBookmark(firstValidStory))}  />
                                <Link href={`/stories/${firstValidStory.id}`} className="w-full">
                                    <Image src={firstValidStory?.story?.banner_image} alt={firstValidStory?.story.banner_image} width={250} height={200} className="rounded-[2px] w-full h-full object-fill lg:object-cover object-center " />
                                </Link>
                                <div className="lg:absolute lg:bottom-0 w-full flex flex-col gap-3 items-start justify-start p-2 sm:p-4 ">
                                    <p className="line-clamp-3 lg:line-clamp-2 font-semibold text-lg lg:text-[28px] ">{firstValidStory?.story.description}</p>
                                    <p className="line-clamp-3 lg:line-clamp-2 font-medium lg:text-lg ">{firstValidStory?.story.subtitle}</p>
                                    <div className="flex items-center justify-start gap-1 ">
                                        <p className="w-[10px] h-[10px] bg-[#F52A32] rounded-full " />
                                        <p className="text-sm">{firstValidStory?.story.author}</p>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-5 flex gap-1 bg-[#0000005E] text-white p-1 px-2 text-sm items-center justify-center w-fit rounded-full ">
                                    <div className="bg-[#d72b81] p-1 w-[20px] h-[20px] rounded-full flex items-center justify-center ">
                                        <Image src={crown} alt={"crown"} width={10} height={10} className="w-full h-full " />
                                    </div>
                                    <p className="capitalize">editor&apos;s pick</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 items-start justify-start ">
                                <h2 className="uppercase font-bold text-lg ">more stories</h2>
                                <div className="flex flex-col gap-5 items-start justify-start ">
                                    {[1,2,3,4,5].map((item,index:number)=>(
                                        <div className="flex items-start justify-start gap-1"key={index}>
                                            <p className="w-[15px] h-[12px] bg-[#F52A32] rounded-sm " />
                                            <p className="line-clamp-3 lg:line-clamp-2 font-medium   ">{firstValidStory?.story.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ):(
                        <div className="h-[300px] flex items-center justify-center w-full ">
                            <p className="capitalize font-semibold text-3xl ">coming soon...</p>
                        </div>
                    )}
                </>
            )}
        </div>
     );
}
 
export default EditorsPick;