"use client"

import Link from "next/link";
import Image from "next/image";
import { CombinedStoryType, MiniStoryType } from "@/utils/types";
import { Bookmark } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { toggleBookmark } from "@/lib/redux/slice/bookmarkSlice";

const StoryCard = ({ stories }: { stories: CombinedStoryType[] }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Normalize each story to MiniStoryType shape
    const normalizeStory = (story: CombinedStoryType): MiniStoryType | null => {
        if (typeof story === 'object' && story !== null) {
            if ('story' in story) {
                return {
                    ...story.story,
                    id: story.id,
                    updated_at: story.updated_at
                }
            }
            return story as MiniStoryType;
        }
        return null; // skip invalid items
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-[repeat(1,minmax(300px,450px))] lg:grid-cols-[repeat(3,minmax(300px,450px))] items-start justify-center gap-3">
            {stories.map((story) => {
                const currentStory = normalizeStory(story);
                if (!currentStory) return null;
                if(currentStory){
                return (
                    <div className="relative h-[700px] flex flex-col items-center justify-start gap-6" key={currentStory.id}>
                        <Link href={`/stories/${currentStory?.id}`} className="w-full">
                            <Image
                                src={currentStory?.banner_image}
                                alt={currentStory.banner_image}
                                width={250}
                                height={200}
                                className="rounded-[2px] w-full h-[290px] object-fill object-center"
                            />
                        </Link>

                        <Bookmark
                            className="cursor-pointer text-white absolute top-3 right-3"
                            onClick={() => dispatch(toggleBookmark(currentStory))}
                        />

                        <div className="flex flex-col items-start justify-start gap-3 p-2">
                            <div className="flex flex-col gap-3 items-start justify-center py-2 border-b border-b-[#C8C8C8]">
                                <p className="line-clamp-2 md:line-clamp-3 font-semibold text-[#282828] text-lg sm:text-2xl">
                                    {currentStory.description}
                                </p>
                                <div className="text-sm flex items-center justify-between w-full gap-1">
                                    <div className="flex gap-1 items-center justify-start">
                                        <p className="w-[10px] h-[10px] rounded-full bg-[#F52A32]" />
                                        <p className="capitalize">{currentStory.author}</p>
                                    </div>
                                    <div className="flex gap-1 items-center justify-start">
                                        <p className="w-[10px] h-[10px] rounded-full bg-[#F52A32]" />
                                        <p>{new Date(currentStory.created_at).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            })}
        </div>
    );
}

export default StoryCard;
