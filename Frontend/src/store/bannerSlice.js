import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    bannerImage : []
}

const bannerSlice = createSlice({
    name : 'banner',
    initialState : initialValue,
    reducers : {
        handleAddBanner : (state,action)=>{
            state.bannerImage = [...action.payload]
        }
    }
})

export const { handleAddBanner } = bannerSlice.actions

export default bannerSlice.reducer
