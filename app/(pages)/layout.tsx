"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileNav from "@/components/MobileNav";
import SearchResult from "@/components/SearchResult";
import { useGetStoriesQuery } from "@/lib/redux/api/storiesApi";
import { client } from "@/lib/TansackQuery";
import { MiniStoryType } from "@/utils/types";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [search, setSearch] = useState<string>("");
  const [stories, setStories] = useState<MiniStoryType[]>([]);
  const [showInput,setShowInput] = useState<boolean>(false)
  const { isLoading, error, data } = useGetStoriesQuery();
  useEffect(() => {
    if (data) {
      setStories(data);
    }
    if (error) {
      console.log(error);
    }
  }, [data, error, isLoading]);
  return (
    <QueryClientProvider client={client}>
      <Hero showInput={showInput} setShowInput={setShowInput} search={search} set={setSearch} />
      <MobileNav />
      
      <div className="min-h-dvh w-full">
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
    </QueryClientProvider>
  );
};

export default Layout;
