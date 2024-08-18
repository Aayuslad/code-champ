import { AxiosError } from "axios";
import toast from "react-hot-toast";

export interface ErrorResponse {
	message: string;
}

const apiErrorHandler = (error: unknown, toastId?: string) => {
	const err = error as AxiosError<ErrorResponse>;
	toastId && toast.dismiss(toastId);
	toast.error(err.response?.data.message || "An error occurred!");
	console.error(err);
};

export default apiErrorHandler;
