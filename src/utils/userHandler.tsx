
import { clearAdmin } from "../slice/adminSlice";
import { deleteAllCookie } from "./cookie";

export const kickUser = async (): Promise<void> => {
  localStorage.removeItem("admin");
  clearAdmin()
  deleteAllCookie();

  if (!window.location.pathname.includes("login")) {
    window.location.href = "/login";
  }
};
