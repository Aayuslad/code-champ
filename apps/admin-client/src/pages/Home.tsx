import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/admin"; // Change if needed

interface Question {
    id: number;
    title: string;
    createdAt: string;
    createdBy: {
        id: number;
        userName: string;
    };
}

interface Contest {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    createdAt: string;
    createdBy: {
        id: number;
        userName: string;
    };
}

interface QuestionList extends Array<Question> {}
interface ContestList extends Array<Contest> {}

export default function Home({ setIsLoggedIn, isLoggedIn }: { setIsLoggedIn: (v: boolean) => void; isLoggedIn: boolean }) {
    const navigate = useNavigate();
    const [questionList, setQuestionList] = useState<QuestionList>([]);
    const [contestList, setContestList] = useState<ContestList>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                if (isLoggedIn) {
                    setLoading(true);
                    const [questionRes, contestRes] = await Promise.all([
                        axios.get<QuestionList>(`${API_URL}/question-requests`),
                        axios.get<ContestList>(`${API_URL}/contest-requests`),
                    ]);
                    questionRes && setQuestionList(questionRes.data);
                    contestRes && setContestList(contestRes.data);
                }
            } catch (err) {
                console.error("Failed to fetch requests", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        await axios.post(`${API_URL}/logout`);
        navigate("/login");
    };

    const approveQuestion = async (id: number) => {
        try {
            await axios.post(`${API_URL}/question-requests/${id}/approve`);
            setQuestionList(prev => prev.filter(q => q.id !== id));
        } catch (err) {
            console.error("Failed to approve question", err);
        }
    };

    const rejectQuestion = async (id: number) => {
        try {
            await axios.post(`${API_URL}/question-requests/${id}/reject`);
            setQuestionList(prev => prev.filter(q => q.id !== id));
        } catch (err) {
            console.error("Failed to reject question", err);
        }
    };

    const approveContest = async (id: number) => {
        try {
            await axios.post(`${API_URL}/contest-requests/${id}/approve`);
            setContestList(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error("Failed to approve contest", err);
        }
    };

    const rejectContest = async (id: number) => {
        try {
            await axios.post(`${API_URL}/contest-requests/${id}/reject`);
            setContestList(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            console.error("Failed to reject contest", err);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-[#23272f]">
            <header className="w-full flex items-center justify-between bg-[#3d4b6a] shadow-md">
                <span className="text-white font-bold text-2xl tracking-wide">Admin Panel Code Champ</span>
                <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-md bg-[#646cff] text-white font-bold text-base cursor-pointer shadow-md hover:bg-[#747cff] transition-colors"
                >
                    Logout
                </button>
            </header>

            <div className="max-w-4xl mx-auto mt-24 text-center">
                <h2 className="text-xl font-semibold mb-6 text-white">Question Contribution Requests</h2>
                <table className="min-w-full bg-[#2d3340] rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-[#3d4b6a]">
                            <th className="py-2 px-4 text-white">Title</th>
                            <th className="py-2 px-4 text-white">Created At</th>
                            <th className="py-2 px-4 text-white">Created By</th>
                            <th className="py-2 px-4 text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <div className="text-blue-400 mb-4 flex items-center justify-center gap-2">
                                <span>Loading questions...</span>
                            </div>
                        ) : questionList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-4 text-gray-400 text-center">
                                    No questions found.
                                </td>
                            </tr>
                        ) : (
                            questionList.map(q => (
                                <tr key={q.id} className="border-t border-[#3d4b6a]">
                                    <td className="py-2 px-4 text-white text-left">{q.title}</td>
                                    <td className="py-2 px-4 text-white">{new Date(q.createdAt).toLocaleString()}</td>
                                    <td className="py-2 px-4 text-white">{q.createdBy.userName}</td>
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            className="px-3 py-1 text-sm bg-emerald-500 text-white rounded cursor-pointer hover:bg-emerald-600 active:bg-emerald-700 transition-all duration-200 font-medium"
                                            onClick={() => approveQuestion(q.id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm bg-rose-500 text-white rounded cursor-pointer hover:bg-rose-600 active:bg-rose-700 transition-all duration-200 font-medium"
                                            onClick={() => rejectQuestion(q.id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <h2 className="text-xl font-semibold mb-6 mt-12 text-white">Contest Contribution Requests</h2>
                <table className="min-w-full bg-[#2d3340] rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-[#3d4b6a]">
                            <th className="py-2 px-4 text-white">Title</th>
                            <th className="py-2 px-4 text-white">Start Time</th>
                            <th className="py-2 px-4 text-white">End Time</th>
                            <th className="py-2 px-4 text-white">Created By</th>
                            <th className="py-2 px-4 text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <div className="text-blue-400 mb-4 flex items-center justify-center gap-2">
                                <span>Loading contests...</span>
                            </div>
                        ) : contestList.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-4 text-gray-400 text-center">
                                    No contests found.
                                </td>
                            </tr>
                        ) : (
                            contestList.map(contest => (
                                <tr key={contest.id} className="border-t border-[#3d4b6a]">
                                    <td className="py-2 px-4 text-white text-left">{contest.title}</td>
                                    <td className="py-2 px-4 text-white">{new Date(contest.startTime).toLocaleString()}</td>
                                    <td className="py-2 px-4 text-white">{new Date(contest.endTime).toLocaleString()}</td>
                                    <td className="py-2 px-4 text-white">{contest.createdBy.userName}</td>
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            className="px-3 py-1 text-sm bg-emerald-500 text-white rounded cursor-pointer hover:bg-emerald-600 active:bg-emerald-700 transition-all duration-200 font-medium"
                                            onClick={() => approveContest(contest.id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-3 py-1 text-sm bg-rose-500 text-white rounded cursor-pointer hover:bg-rose-600 active:bg-rose-700 transition-all duration-200 font-medium"
                                            onClick={() => rejectContest(contest.id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
