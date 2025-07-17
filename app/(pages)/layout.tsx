"use client";
import { useQuery } from "@tanstack/react-query"
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileNav from "@/components/MobileNav";
import SearchResult from "@/components/SearchResult";
import { MiniStoryType } from "@/utils/types";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [stories, setStories] = useState<MiniStoryType[]>([]);
  const [showInput,setShowInput] = useState<boolean>(false)
  const getStories = async ()=>{
    const res = await fetch("https://api.agcnewsnet.com/api/general/")
    if(!res.ok){
      throw new Error('failed to fetch')
    }
    return res.json()
  }
  const { isLoading, error, data } = useQuery({
    queryKey:["stories"],
    queryFn: getStories
  });
  useEffect(() => {
    if (data) {
      setStories(data.data.data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, isLoading]);
  return (
    <>
      <Hero showInput={showInput} setShowInput={setShowInput} search={search} set={setSearch} />
      <MobileNav />
      
      <div className="min-h-dvh flex flex-col items-center justify-center w-full">
        {!search.trim()||!showInput ? (
          <>{children}</>
        ) : (
          <>
            {!search.trim()&&(
                <div className="">
                    search for latest news
                </div>
            )}
            {isLoading ? (
              "loading..."
            ) : (
              <>
                {stories.length > 0 ? (
                  <SearchResult
                    stories={stories.filter((story) =>
                      story.title.toLowerCase().includes(search.toLowerCase())
                    )}
                  />
                ) : (
                  <div className="flex items-center justify-center ">
                    Result for {search} was not found
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer 
      search={search}
      setSearch={setSearch}
       />
    </>
  );
};

export default Layout;
