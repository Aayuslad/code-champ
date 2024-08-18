import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandigPage";
import PasswordReset from "./pages/PasswordReset";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import VerifyPasswordResetOtp from "./pages/VerifyPasswordResetOtp";
import VerifySignupOtp from "./pages/VerifySignupOtp";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/home" element={<Home />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/password-reset" element={<PasswordReset />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify-password-reset-otp" element={<VerifyPasswordResetOtp />} />
					<Route path="/verify-signup-otp" element={<VerifySignupOtp />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
