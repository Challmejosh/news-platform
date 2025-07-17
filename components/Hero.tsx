"use client"
import Link from "next/link";
import facebook from "../public/facebook.svg" 
import instagram from "../public/instagram.svg" 
import linkedin from "../public/linkedin.svg" 
import twitter from "../public/twitter.svg" 
import other from "../public/other.svg" 
import newsIcon from "../public/news-icon.svg"
import Advert from "../public/advert.png"
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Search, X } from "lucide-react";
import Menu from "../public/menu.svg"
import User from "../public/user.svg"
import { useDispatch } from "react-redux";
import { toggle } from "@/lib/redux/slice/toggleSlice";

const SearchIcon = dynamic(() => import("lucide-react").then(mod => mod.Search), { ssr: false });
export interface CategoryType{
    category_id:number
    category_name:string
    created_at:string
    total_stories:number
    updated_at:string
}
interface Prop{
    search: string
    set: Dispatch<SetStateAction<string>>
    showInput: boolean
    setShowInput: Dispatch<SetStateAction<boolean>>
}
const Hero = ({search,set,showInput,setShowInput}:Prop) => {
    const [categories,setCategories] = useState<CategoryType[]>([])
    const dispatch = useDispatch()
    const links: {text:string,link:string}[] = [
        {text:"about us",link:"about"},
        {text:"contact us",link:"contact"},
        {text:"AGC archives",link:"agc-archives"},
        {text:"advert rate",link:"advert-rate"},
        {text:"privacy policy",link:"privacy-policy"},
        {text:"AGC VIP",link:"agc-vip"},
    ]
    const social: {src:string,link:string}[] = [
        {src: instagram,link: "/"},
        {src: facebook,link: "/"},
        {src: twitter,link: "/"},
        {src: other,link: "/"},
        {src: linkedin,link: "/"},
    ]

    const fetchCategory = async ()=>{
        const category = await fetch("https://api.agcnewsnet.com/api/general/categories")
        if(!category.ok){
            throw new Error("Error fetching data")
        }
        return category.json()
    }
    const {data,error, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategory
    })
    useEffect(()=>{
        if(data){
            setCategories(data.data.data)
        }
    },[data])
    if(error){
        return "loading"
    }
    return ( 
        <div className="p-3 lg:p-0 flex lg:flex-col items-center lg:items-start justify-between w-full h-full lg:h-[421px] bg-[#1B1B1B] ">
            {/* desktop version */}
            <>
                {/* top nav */}
                <div className="bg-[#D32C89] hidden p-3 w-full lg:flex items-center justify-between ">
                    <div className="text-white flex gap-2 items-center justify-start ">
                        {links?.map((item,index:number)=>(
                            <Link key={index} href={`/${item.link}`} className="font-medium text-sm capitalize ">
                                {item.text}
                            </Link>
                        ))}
                    </div>
                    <div className="text-white flex items-center gap-3 justify-center ">
                        <p className="text-sm ">Sunday, March 3, 2024</p>
                        <p className="h-[14px] w-[1px] bg-white " />
                        <div className="flex items-center justify-center gap-2 ">
                            {social.map((item,index:number)=>(
                                <Link key={index} href={item.link}>
                                    <Image src={item.src} alt={item.src} width={20} height={20} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* adverts  */}
                <div className="hidden w-full px-16 p-8 h-[307px] lg:flex">
                    <Image src={Advert} alt={"advert-image"} width={250} height={230} className="w-full h-full" />
                </div>
                {/* category */}
                <div className="hidden p-4 text-sm lg:flex itemscenter justify-between w-full ">
                    <div className="flex items-center justify-start gap-4 w-1/2 ">
                        <Image src={newsIcon} alt={newsIcon} width={70} height={70} />
                        <div className="">
                            {isLoading?(
                                <div className="flex gap-3 items-center justify-center ">
                                    {[1,2,3,4,].map((index)=>(
                                        <p className="h-[25px] w-[80px] bg-slate-50 animate-pulse rounded-md " key={index}></p>
                                    ))}
                                </div>
                            ):(
                                <>
                                {categories.length>0&&(
                                    <div className="flex gap-3 items-center justify-center ">
                                        {categories?.map(category=>(
                                            <Link key={category.category_id} href={`/${category.category_name.toLowerCase().split(" ")}`} className="text-white ">
                                                {category.category_name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="text-white flex gap-3 items-center justify-center ">
                        <p className="h-[14px] w-[1px] bg-white " />
                        <div className="flex gap-2 items-center justify-center  ">
                            <Link href={"/"} className="capitalize">
                                home
                            </Link>
                            <Link href={"/bookmark"} className="capitalize">
                                bookmark
                            </Link>
                            <Link href={"/photos"} className="capitalize">
                                photos
                            </Link>
                            <Link href={"/videos"} className="capitalize">
                                videos
                            </Link>
                            <Link href={"/audios"} className="capitalize">
                                audios
                            </Link>
                            {!showInput?<SearchIcon className="cursor-pointer" onClick={()=>setShowInput(prev=>!prev)} />:<X className="cursor-pointer" onClick={()=>setShowInput(prev=>!prev)} />}
                            {showInput&&
                            <input placeholder="search news" title="search news" type="text" value={search} onChange={(e)=>set(e.target.value)}
                            className="w-[200px] px-5 py-1 flex border-slate-50 border rounded-md placeholder:text-slate-600 " />}
                            <Link href={"/signin"} className="capitalize">
                                Log in / Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </>
            {/* mobile version */}
            <div className="lg:hidden flex items-center justify-center">
                <Image onClick={()=>dispatch(toggle())} className="cursor-pointer" src={Menu} alt={Menu} width={40} height={30} />
                <Search />
                <Image src={newsIcon} alt={newsIcon} width={40} height={30} />
            </div>
            <div className="lg:hidden flex items-center justify-center gap-1">
                <Image className="cursor-pointer" src={User} alt={newsIcon} width={40} height={30} />
                <ChevronDown className="cursor-pointer" fill="white" />
            </div>
        </div>
     );
}
 
export default Hero;
