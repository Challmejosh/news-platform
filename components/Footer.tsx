import Image from "next/image";
import newsIcon from "../public/news-icon.svg"
import Link from "next/link";
import facebook from "../public/facebook.svg" 
import instagram from "../public/instagram.svg" 
import linkedin from "../public/linkedin.svg" 
import twitter from "../public/twitter.svg" 
import other from "../public/other.svg" 
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
interface Prop{
    search: string
    setSearch: Dispatch<SetStateAction<string>>
}
const Footer = ({search,setSearch}:Prop) => {
    const social: {src:string,link:string}[] = [
        {src: instagram,link: "/"},
        {src: facebook,link: "/"},
        {src: twitter,link: "/"},
        {src: other,link: "/"},
        {src: linkedin,link: "/"},
    ]
    return ( 
        <footer className="w-full bg-[#2D2A2A] flex flex-col gap-3 items-start justify-center p-4 sm:p-8 lg:p-16 text-white ">
            <div className="w-full flex items-center justify-between ">
                <Image src={newsIcon} alt={newsIcon} width={70} height={70} />
                <div className="flex items-center justify-center gap-2 ">
                    {social.map((item,index:number)=>(
                        <Link key={index} href={item.link}>
                            <Image src={item.src} alt={item.src} width={20} height={20} />
                        </Link>
                    ))}
                </div>
            </div>
            <div className="w-full rounded-md py-2 px-3 flex items-center justify-center gap-2 bg-white  ">
                <input
                 type="text" 
                 value={search}
                 onChange={(e)=>setSearch(e.target.value)}
                 placeholder="Search AGC newsnet"
                 title="search agc new"
                 className="w-full text-[#2D2A2A] flex focus:outline-none px-3 py-1 " />
                 <Search color="#2D2A2A" />
            </div>
            <div className="w-full font-semibold grid grid-cols-3 md:grid-cols-5 gap-6 items-start justify-between ">
                <div className="flex flex-col gap-2 items-start text-white justify-center ">
                    <Link href="#" className="capitalize">home</Link>
                    <Link href="#" className="capitalize">africa</Link>
                    <Link href="#" className="capitalize">politics</Link>
                </div>
                <div className="flex flex-col gap-2 items-start text-white justify-center ">
                    <Link href="#" className="capitalize">business</Link>
                    <Link href="#" className="capitalize">sports</Link>
                    <Link href="#" className="capitalize">health</Link>
                </div>
                <div className="flex flex-col gap-2 items-start text-white justify-center ">
                    <Link href="#" className="capitalize">tech</Link>
                    <Link href="#" className="capitalize">opinions</Link>
                    <Link href="#" className="capitalize">videos</Link>
                </div>
                <div className="flex flex-col gap-2 items-start text-white justify-center ">
                    <Link href="#" className="capitalize">photos</Link>
                    <Link href="#" className="capitalize">AGC archive</Link>
                    <Link href="#" className="capitalize">privacy policy</Link>
                </div>
                <div className="flex flex-col gap-2 items-start text-white justify-center ">
                    <Link href="#" className="capitalize">about us</Link>
                    <Link href="#" className="capitalize">contact us</Link>
                    <Link href="#" className="capitalize">advert rate</Link>
                </div>
            </div>
        </footer>
     );
}
 
export default Footer;