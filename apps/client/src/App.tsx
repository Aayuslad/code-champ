import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GoogleOneTapLogin from "./components/googleOneTapLogin";
import Blogs from "./pages/Blogs";
import ContestRegisteration from "./pages/ContestRegistration";
import Contribute from "./pages/Contribute";
import ForgotPassword from "./pages/ForgotPassword";
import CodeChampLandingPage from "./pages/LandingPage2";
import LiveContest from "./pages/LiveContest";
import LoadingPage from "./pages/LoadingPage";
import PasswordReset from "./pages/PasswordReset";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SolveProblem from "./pages/SolveProblem";
import VerifyPasswordResetOtp from "./pages/VerifyPasswordResetOtp";
import VerifySignupOtp from "./pages/VerifySignupOtp";
import { AuthStore } from "./stores/authStore";
import { UiStore } from "./stores/uiStore";
import { defineEditorThemes } from "./utils/editorThemes";
import ContestFeed from "./pages/ContestFeed";
import SolveContestProblem from "./pages/SolveContestProblem";

function App() {
    const uiStore = UiStore();
    const authStore = AuthStore();

    useEffect(() => {
        uiStore.setTheme();
        authStore.fetchUserProfile();
        defineEditorThemes();
    }, []);

    return (
        <Router>
            <div className="DefaultPage h-fit min-h-screen bg-light100 dark:bg-dark100 text-gray-700 dark:text-gray-200 font-poppins text-[0.9rem]">
                {!authStore.loading && !authStore.isLoggedIn && <GoogleOneTapLogin />}

                <Routes>
                    <Route path="/" element={<CodeChampLandingPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify-password-reset-otp" element={<VerifyPasswordResetOtp />} />
                    <Route path="/verify-signup-otp" element={<VerifySignupOtp />} />

                    <Route path="/problems" element={authStore.loading ? <LoadingPage /> : <Problems />} />
                    <Route path="/contribute/:stage" element={authStore.loading ? <LoadingPage /> : <Contribute />} />
                    <Route path="/profile/:userId" element={authStore.loading ? <LoadingPage /> : <Profile />} />
                    <Route path="/blogs" element={authStore.loading ? <LoadingPage /> : <Blogs />} />
                    <Route path="/contest" element={authStore.loading ? <LoadingPage /> : <ContestFeed />} />
                    {/* <Route path="/contest" element={authStore.loading ? <LoadingPage /> : <Blogs />} /> */}
                    <Route
                        path="/solve-problem/:id/:nav1/:nav2"
                        element={authStore.loading ? <LoadingPage /> : <SolveProblem />}
                    />
                    <Route
                        path="/contest-registration/:contestId"
                        element={authStore.loading ? <LoadingPage /> : <ContestRegisteration />}
                    />
                    <Route path="/live-contest/:contestId" element={authStore.loading ? <LoadingPage /> : <LiveContest />} />
                    <Route
                        path="/live-contest/:contestId/solve-problem/:contestProblemId/:participantId/:nav1/:nav2"
                        element={authStore.loading ? <LoadingPage /> : <SolveContestProblem />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
