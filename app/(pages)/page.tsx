import Category from "@/components/category";
import EditorsPick from "@/components/editorPick";
import FeaturedStories from "@/components/Featuredstories";
import TopStories from "@/components/TopStories";
import Image from "next/image"
import Advert from "@/public/advert.png"


export default function Home() {

  return (
    <div className="">
      <Image src={Advert} alt={"advert-image"} width={250} height={230} className="w-full lg:hidden my-2 h-full" />
      <TopStories />
      <EditorsPick />
      <FeaturedStories />
      <Category />
    </div>
  );
}
