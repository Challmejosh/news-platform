import { MiniStoryType } from "@/utils/types";
import StoryCard from "./StoryCard";

const SearchResult = ({stories}:{stories: MiniStoryType[]}) => {
    return ( 
        <div className="p-4 sm:p-8">
            {stories&&<>
                {stories.length>0&&(
                    <StoryCard 
                    stories={stories}
                    />
                )}
            </>}
        </div>
     );
}
 
export default SearchResult;