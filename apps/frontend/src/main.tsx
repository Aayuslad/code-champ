import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
