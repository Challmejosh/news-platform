"use client"
import { client } from "@/lib/TansackQuery
import { store } from "@/lib/redux/store";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query
const AppLayout = ({children}:{children:React.ReactNode}) => {
    return ( 
        <QueryClientProvider client={client} >
        <Provider store={store}>
            {children}
        </Provider>
        </QueryClientProvider>
     );
}
 
export default AppLayout;
