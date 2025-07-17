import { MiniStoryType } from '@/utils/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API service
export const storiesApi = createApi({
    reducerPath: 'storiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.agcnewsnet.com/api/general/' }),
    endpoints: (builder) => ({
        getStories: builder.query<MiniStoryType[], void>({
            query: () => 'stories/',
            transformResponse: (response: any) => response.data.data,
        }),
    }),
});

// Export the auto-generated hook
export const { useGetStoriesQuery } = storiesApi;
