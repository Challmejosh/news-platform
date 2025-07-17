"use client"
import Image from "next/image";
import facebook from "../public/facebook.svg" 
import instagram from "../public/instagram.svg" 
import linkedin from "../public/linkedin.svg" 
import twitter from "../public/twitter.svg" 
import other from "../public/other.svg" 
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { CategoryType } from "./Hero";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { toggle } from "@/lib/redux/slice/toggleSlice";
const MobileNav = () => {
        const [categories,setCategories] = useState<CategoryType[]>([])
        const toggleNav = useSelector((state:RootState)=>state.toggle.toggle)
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
        <div className={` ${toggleNav?"-translate-x-0" : "-translate-x-full"} py-2 gap-2 bg-[#1B1B1B] w-full min-h-dvh fixed top-0 right-0 z-50 transform transition-transform duration-300 ease-in-out  lg:hidden p-3 flex flex-col items-center justify-start`} >
            {/* close */}
            <div className="w-full flex items-center justify-end">
                <X className="cursor-pointer text-white absolute top-3 right-5 " onClick={()=>dispatch(toggle())} />
            </div>
            {/* top nav */}
            <div className="p-1 w-full flex flex-col items-start justify-center ">
                <div className="text-white flex flex-col gap-2 items-start justify-start ">
                    {links?.map((item,index:number)=>(
                        <Link key={index} href={`/${item.link}`} className="font-medium text-sm capitalize ">
                            {item.text}
                        </Link>
                    ))}
                </div>
                <div className="text-white flex flex-col items-start gap-3 justify-center ">
                    <p className="text-sm ">Sunday, March 3, 2024</p>
                    <div className="flex items-center justify-start gap-2 ">
                        {social.map((item,index:number)=>(
                            <Link key={index} href={item.link}>
                                <Image src={item.src} alt={item.src} width={20} height={20} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* category */}
            <div className="p-1 text-sm flex flex-col gap-2 items-start justify-center w-full ">
                <div className="flex flex-col items-start justify-start gap-4 w-1/2 ">
                    <div className="">
                        {isLoading?(
                            <div className="flex flex-col gap-3 items-start justify-center ">
                                {[1,2,3,4,].map((index)=>(
                                    <p className="h-[25px] w-[80px] bg-slate-50 animate-pulse rounded-md " key={index}></p>
                                ))}
                            </div>
                        ):(
                            <>
                            {categories.length>0&&(
                                <div className="flex flex-col gap-3 items-start justify-center ">
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
                    <div className="flex flex-col gap-2 items-start justify-center  ">
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

                        <Link href={"/signin"} className="capitalize">
                            Log in / Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default MobileNav;