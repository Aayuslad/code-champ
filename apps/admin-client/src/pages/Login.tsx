import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import axios from "axios";

export default function Login({ setIsLoggedIn }: { setIsLoggedIn: (v: boolean) => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await axios.post(`${API_URL}/login`, { password });
            if (res.status === 200) {
                setIsLoggedIn(true);
                setPassword("");
                navigate("/");
            } else {
                setError("Invalid password");
            }
        } catch (err) {
            setError("error");
        }
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-[#23272f]">
            <div className="bg-[#2c313c] p-12 pb-9 rounded-2xl shadow-2xl w-[400px] text-center flex flex-col items-center">
                <h2 className="text-white mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="w-full">
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter admin password"
                        className="px-[18px] py-[14px] w-full mb-6 rounded-lg border border-[#444] text-lg bg-[#23272f] text-white box-border focus:outline-none focus:ring-2 focus:ring-[#646cff]"
                        required
                    />
                    <button
                        type="submit"
                        className="py-[14px] w-full rounded-lg border-none bg-[#646cff] text-white font-bold text-lg cursor-pointer shadow-md hover:bg-[#747cff] transition-colors"
                    >
                        Login
                    </button>
                </form>
                {error && <p className="text-[#ff4d4f] mt-4">{error}</p>}
            </div>
        </div>
    );
}
