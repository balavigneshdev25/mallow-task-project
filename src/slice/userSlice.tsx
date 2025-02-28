import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  total: number;
}

const initialState: UsersState = {
  users: [],
  total: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UsersState>) => {
      state.users = action.payload.users;
      state.total = action.payload.total;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
