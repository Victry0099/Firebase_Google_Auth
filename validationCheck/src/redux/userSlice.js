import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currUser = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
