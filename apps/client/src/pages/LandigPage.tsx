import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-5 w-full max-w-[700px] text-center flex flex-col justify-center min-h-screen ">
                <h1 className="text-[1.4rem] sm:text-2xl font-bold text-gray-800 mb-4">
                    <span className="sm:hidden">Welcome to</span>
                    <span className="sm:hidden block">Code Champ!</span>
                    <span className="hidden sm:inline">🚀 Welcome to Code Champ! 🚀</span>
                    <span className="sm:hidden block mt-2">
                        <svg
                            className="w-6 h-6 inline-block text-yellow-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mb-4">Thank you for visiting Code Champ!</p>{" "}
                <p className="text-gray-600 mb-4">
                    {" "}
                    We are hard at work building an incredible platform for coding enthusiasts like you. Code Champ will be your
                    ultimate destination for coding challenges, skill enhancement, and community engagement.
                </p>
                <div className="mb-1">
                    <button
                        type="button"
                        className="border px-3 py-1 mx-1 rounded-md bg-light300 dark:bg-dark300"
                        onClick={() => navigate("/signin")}
                    >
                        Signin
                    </button>
                    <button
                        type="button"
                        className="border px-3 py-1 mx-1 rounded-md bg-light300 dark:bg-dark300"
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </button>
                    <button
                        type="button"
                        className="border px-3 py-1 mx-1 rounded-md bg-light300 dark:bg-dark300"
                        onClick={() => navigate("/problems")}
                    >
                        Problems
                    </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">What’s coming soon:</h2>
                <ul className="list-none text-left mb-4 mx-auto max-w-md">
                    <li className="mb-2">
                        <span className="text-green-500 font-bold">✔</span> <strong>Exciting Coding Challenges:</strong> Test and
                        improve your coding skills with a variety of challenges.
                    </li>
                    <li className="mb-2">
                        <span className="text-green-500 font-bold">✔</span> <strong>Leaderboard and Competitions:</strong>{" "}
                        Compete with coders from around the world and see how you rank.
                    </li>
                    <li className="mb-2">
                        <span className="text-green-500 font-bold">✔</span> <strong>Comprehensive Learning Resources:</strong>{" "}
                        Access tutorials, guides, and resources to enhance your coding knowledge.
                    </li>
                    <li className="mb-2">
                        <span className="text-green-500 font-bold">✔</span> <strong>Community Interaction:</strong> Connect,
                        collaborate, and share knowledge with other passionate coders.
                    </li>
                </ul>
                <p className="text-gray-600 mb-4">Stay tuned and thank you for your patience!</p>
                <p className="text-gray-600 mb-4">
                    Best Regards,
                    <br />
                    The Code Champ Team
                </p>
                <p className="text-gray-600 mb-4">
                    For any inquiries, feel free to reach out to us at:{" "}
                    <a href="mailto:codechamp.xyz@gmail.com" className="text-blue-500">
                        codechamp.xyz@gmail.com
                    </a>
                </p>
                <p className="text-gray-600">
                    Or contact Aayush directly at:{" "}
                    <a href="mailto:aayushvlad@gmail.com" className="text-blue-500">
                        aayushvlad@gmail.com
                    </a>
                </p>
            </div>
        </div>
    );
}
