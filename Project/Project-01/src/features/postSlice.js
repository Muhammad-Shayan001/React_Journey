import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false,
    userData: null
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        post : (state , action) => { 
            state.allPost = action.payload.posts
            state.post = action.payload.post
        }
    }
})

export const {post} = postSlice.actions

export default postSlice.reducers

