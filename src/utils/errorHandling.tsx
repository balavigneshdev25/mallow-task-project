import toast from "react-hot-toast";
import { kickUser } from "./userHandler";

interface ErrorResponse {
  status?: number;
  data?: {
    data?: string[];
    message?: string;
    error?: string;
  };
  message?: string;
  error?: string;
}

export const errorHandler = async (error: ErrorResponse): Promise<void> => {
  const status_code = error?.status;
  const message =
    error?.data?.data?.[0] || error?.data?.message || error?.error || error?.message;

  const errorMessages: Record<number, string> = {
    401: "Access Denied.!!!",
    403: "Access Denied.!!!",
    404: "Not Found.!!!",
    422: "Invalid Data.!!!",
    429: "Too Many Requests.!!!",
    400: "Bad Request.!!!",
    500: "Internal Server Error.!!!",
    502: "Could not fetch data from remote.!!!",
  };

  if ([401, 403].includes(status_code!)) {
    await kickUser();
  }

  toast.error(message || errorMessages[status_code!] || "Something is not right.!!");
};
