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

function App() {
	return (
		<Router>
			<div className="DefaultPage w-screen h-fit min-h-screen bg-light100 dark:bg-dark100 text-black dark:text-white">
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify-password-reset-otp" element={<VerifyPasswordResetOtp />} />
					<Route path="/verify-signup-otp" element={<VerifySignupOtp />} />

					<Route path="/problems" element={<Problems />} />
					<Route path="/contribute" element={<Contribute />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/blogs" element={<Blogs />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
