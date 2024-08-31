import { Link } from "react-router-dom";
import NavToggleButton from "../buttons/navToggleButton";
import { UiStore } from "../../stores/uiStore";
import { AuthStore } from "../../stores/authStore";
import { GoDiscussionClosed } from "react-icons/go";
import { RiApps2AddLine } from "react-icons/ri";
import { LuCode2 } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { GoTrophy } from "react-icons/go";

export const SideNavbar = () => {
	const uiStore = UiStore();
	const authStore = AuthStore();

	return (
		<aside
			className={`SideNavbar fixed border-r-2 ${uiStore.sideBarToggle ? "w-48" : "w-16"} h-screen flex flex-col transition-[width] duration-300 bg-light200 dark:bg-dark200 border-light300 dark:border-dark300`}
		>
			<div className={`flex items-center h-14 px-3 ${uiStore.sideBarToggle ? "justify-end" : "justify-center"}`}>
				<NavToggleButton />
			</div>

			<nav className="pt-4 h-full">
				<ul
					className={`h-full flex pl-[20px] pr-4 flex-col ${uiStore.sideBarToggle ? "items-start" : "items-start"} text-xl gap-1`}
				>
					<li className="w-full">
						<Link to="/home" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<HiOutlineHome />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Home
							</div>
						</Link>
					</li>
					<li className="w-full">
						<Link to="/profile" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<FiUser />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Profile
							</div>
						</Link>
					</li>
					<li className="w-full">
						<Link to="/problems" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<LuCode2 />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Problems
							</div>
						</Link>
					</li>
					<li className="w-full">
						<Link to="/contest" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<GoTrophy />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Contest
							</div>
						</Link>
					</li>
					<li className="w-full">
						<Link to="/contribute" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<RiApps2AddLine />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Contribute
							</div>
						</Link>
					</li>
					<li className="w-full">
						<Link to="/blogs" className="flex items-center gap-4 hover:underline">
							<div className="text-2xl py-4">
								<GoDiscussionClosed />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"}`}
							>
								Blogs
							</div>
						</Link>
					</li>
					<li className="mt-auto mb-4 text-red-600 w-full">
						<button
							type="button"
							className="flex items-center gap-4 hover:underline"
							onClick={() => authStore.signoutUser()}
						>
							<div className="text-2xl py-4">
								<MdLogout />
							</div>
							<div
								className={`transition-opacity duration-300 cubic-bezier(0.860, 0.000, 0.070, 1.000) ${uiStore.sideBarToggle ? "opacity-100" : "opacity-0 hidden"} whitespace-nowrap`}
							>
								Sign out
							</div>
						</button>
					</li>
				</ul>
			</nav>
		</aside>
	);
};
