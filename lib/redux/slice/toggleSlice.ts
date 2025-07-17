import { createSlice } from "@reduxjs/toolkit"

interface Toggle{
    toggle: boolean
}
const initialState: Toggle = {
    toggle: false
}
const toggleSlice = createSlice({
    name:"toggle",
    initialState,
    reducers:{
        toggle: (state)=>{
            state.toggle = !state.toggle
        }
    }
})
export const { toggle } = toggleSlice.actions
export default toggleSlice.reducer