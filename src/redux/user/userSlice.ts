import User from "@/interfaces/User";
import { getStorageItem } from "@/functions/localStore";
import { createSlice } from "@reduxjs/toolkit";
import { clear } from "console";
import { clearScreenDown } from "readline";

const initialState: User = {
  id: "",
  name: "",
  surname: "",
  email: "",
  birth: new Date(),
  roles: [{ id: "", name: "" }]
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setStateUser(state, actions) {
      return state = actions.payload;
    },

    clearStateUser() {
      return initialState;
    }
  }
});

export const { setStateUser, clearStateUser } = userSlice.actions;
export default userSlice.reducer;