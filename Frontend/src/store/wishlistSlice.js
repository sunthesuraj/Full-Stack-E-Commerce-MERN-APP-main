import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist : []
}

const wishlistSlice = createSlice({
    name : "wishlistItem",
    initialState : initialState,
    reducers : {
        updateWishlistItem : (state,action)=>{
           state.wishlist = [...action.payload]
        },
    }
})

export const { updateWishlistItem } = wishlistSlice.actions

export default wishlistSlice.reducer