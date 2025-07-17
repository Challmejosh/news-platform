export interface CategoryType {
    category_id: number;
    category_name: string;
    total_stories: number | null;
    created_at: string;
    updated_at: string;
}

export interface MiniStoryType {
    id: number;
    author: string;
    banner_image: string;
    category: CategoryType;
    content: string;
    created_at: string;
    description: string;
    editors_pick: any; // null or some data type if defined later
    featured: string; // "false" as string
    status: string; // e.g., "published"
    subtitle: string;
    title: string;
    top_story: any; // null or some data type if defined later
    type: string; // e.g., "article"
    updated_at: string;
    views: number;
}

export interface StoryType {
    id: number;
    story:{
    author: string;
    banner_image: string;
    category: {
        category_id: number;
        category_name: string;
        total_stories: number | null;
        created_at: string;
        updated_at: string;
    };
    content: string;
    created_at: string;
    description: string;
    editors_pick: any;  // can be boolean or null
    featured: string; 
    status: string;
    subtitle: string;
    title: string;
    top_story: any; // can be boolean or null
    type: string;
    views: number;
    }
    updated_at: string;
}
export type CombinedStoryType = MiniStoryType | StoryType;