import { getStorageItem } from "@/utils/localStore";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: getStorageItem("user") || {userId: "", email: ""},
    reducers: {
        setUser(state, actions){
            return state = actions.payload;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;