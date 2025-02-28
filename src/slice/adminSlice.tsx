import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  name: string;
  email: string;
  role: string;
}

interface AdminState {
  admin: Admin;
}
const storedAdmin = localStorage.getItem("admin");
const initialState: AdminState = {
    admin: storedAdmin ? JSON.parse(storedAdmin) : { name: "", email: "", role: "" },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify(action.payload));
    },
    clearAdmin: (state) => {
        state.admin = { name: "", email: "", role: "" }; 
      },
  },
});

export const { setAdmin,clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
