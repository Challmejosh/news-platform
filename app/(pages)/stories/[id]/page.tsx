"use client"

import Story from "@/components/Story";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams()
    return ( 
     <Story id={Number(params.id)} />
     );
}
 
export default Page;