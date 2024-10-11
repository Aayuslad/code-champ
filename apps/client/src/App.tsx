import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandigPage";
import PasswordReset from "./pages/PasswordReset";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import VerifyPasswordResetOtp from "./pages/VerifyPasswordResetOtp";
import VerifySignupOtp from "./pages/VerifySignupOtp";
import Problems from "./pages/Problems";
import Contribute from "./pages/Contribute";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Contest from "./pages/Contest";
import SolveProblem from "./pages/SolveProblem";
import LoadingPage from "./pages/LoadingPage";
import { UiStore } from "./stores/uiStore";
import { useEffect } from "react";
import { defineEditorThemes } from "./utils/editorThemes";
import { AuthStore } from "./stores/authStore";
import GoogleOneTapLogin from "./components/googleOneTapLogin";

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
            <div className="DefaultPage h-fit min-h-screen bg-light100 dark:bg-dark100 text-lightText900 dark:text-darkText900">
                {!authStore.loading && !authStore.isLoggedIn && <GoogleOneTapLogin />}
                
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={authStore.loading ? <LoadingPage /> : <Home />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/verify-password-reset-otp" element={<VerifyPasswordResetOtp />} />
                    <Route path="/verify-signup-otp" element={<VerifySignupOtp />} />

                    <Route path="/problems" element={authStore.loading ? <LoadingPage /> : <Problems />} />
                    <Route path="/contribute/:stage" element={authStore.loading ? <LoadingPage /> : <Contribute />} />
                    <Route path="/profile" element={authStore.loading ? <LoadingPage /> : <Profile />} />
                    <Route path="/blogs" element={authStore.loading ? <LoadingPage /> : <Blogs />} />
                    <Route path="/contest" element={authStore.loading ? <LoadingPage /> : <Contest />} />
                    <Route
                        path="/solve-problem/:id/:nav1/:nav2"
                        element={authStore.loading ? <LoadingPage /> : <SolveProblem />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
