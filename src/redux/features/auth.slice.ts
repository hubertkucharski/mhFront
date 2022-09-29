import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FilteredUser } from "../../types/FilteredUser";
import { RootState } from "../store/store";

interface authSliceState {
  user?: FilteredUser;
}

const initialState: authSliceState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      { payload: { user } }: PayloadAction<authSliceState>
    ) => {
      state.user = user;
    },
    clearAuthState: () => initialState,
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user;
