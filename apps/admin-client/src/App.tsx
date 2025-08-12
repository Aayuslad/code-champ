import { useEffect, useState } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";
export const API_URL = "http://localhost:8080/admin"; // Change if needed

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${API_URL}/status`);
                if (res.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (err) {
                //@ts-ignore
                if (err.response && err.response.status === 401) {
                    setIsLoggedIn(false);
                }
            }
        })();
    }, []);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={isLoggedIn ? <Navigate to="/" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route
                    path="/"
                    element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> : <Navigate to="/login" replace />}
                />
                {/* <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
