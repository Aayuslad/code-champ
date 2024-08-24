import { Link } from "react-router-dom";

export const SideNavbar = () => {
	return (
		<div className="SideNavbar fixed border w-20 h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#030712] border-[#E5E7EB] dark:border-[#1F2937]">
			<Link to="/home">Home</Link>
			<Link to="/profile">Profile</Link>
			<Link to="/problems">Problems</Link>
			<Link to="/contribute">Contribute</Link>
			<Link to="/blogs">Blogs</Link>
		</div>
	);
};
