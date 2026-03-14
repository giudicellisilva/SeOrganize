import User from "@/interfaces/User";
import { getStorageItem } from "@/functions/localStore";
import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  surname: "",
  email: "",
  birth: new Date(),
  password:""
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setStateUser(state, actions){
            return state = actions.payload;
        }
    }
});

export const {setStateUser} = userSlice.actions;
export default userSlice.reducer;