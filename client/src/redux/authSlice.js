import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    validUser: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setValidUser(state, action) {
      state.validUser = action.payload;
    },
  },
});

export const { setAccessToken, setValidUser } = authSlice.actions;
export default authSlice.reducer;
