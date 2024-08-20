import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import "dotenv/config";
axios.defaults.baseURL = process.env.API_URL || "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		<Toaster />
		<App />
	</>,
);
