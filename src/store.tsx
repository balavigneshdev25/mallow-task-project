import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/slice/userSlice";
import adminReducer from "../src/slice/adminSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;