import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action){
            return state = {...action.payload}
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer