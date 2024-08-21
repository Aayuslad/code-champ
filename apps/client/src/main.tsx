import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
axios.defaults.baseURL = "https://backend.code-champ.xyz";
// axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<>
		<Toaster />
		<App />
	</>,
);
