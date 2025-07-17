import { CombinedStoryType, MiniStoryType, StoryType } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface BookMark{
    bookmark: CombinedStoryType[]
}

const initialState: BookMark = {
    bookmark: []
}
const normalizeStory = (story: MiniStoryType | StoryType): MiniStoryType => {
    if ('story' in story) {
        return {
            ...story.story,
            id: story.id,
            updated_at: story.updated_at,
        };
    }
    return story;
};

const bookmarkSlice = createSlice({
    name:"bookmark",
    initialState,
    reducers:{
        toggleBookmark: (state,action:PayloadAction<MiniStoryType|StoryType>)=>{
            const normalized = normalizeStory(action.payload);
            const exists = state.bookmark.find(item => item.id === normalized.id);

            if (exists) {
                    const updated = state.bookmark.filter(item => item.id !== normalized.id);
                    state.bookmark = updated;
                    localStorage.setItem("bookmark", JSON.stringify(updated));
                } else {
                    const updated = [...state.bookmark, action.payload];
                    state.bookmark = updated;
                    localStorage.setItem("bookmark", JSON.stringify(updated));
                }

        },
        updateBookmark: (state)=>{
            const getBookmark = localStorage.getItem("bookmark");
            if (getBookmark) {
                try {
                    const parsed: MiniStoryType[] = JSON.parse(getBookmark);
                    state.bookmark = parsed; 
                } catch (e) {
                    console.error("Failed to parse bookmarks from localStorage:", e);
                }
            }
        }
    }
})


export const { toggleBookmark,updateBookmark } = bookmarkSlice.actions
export default bookmarkSlice.reducer