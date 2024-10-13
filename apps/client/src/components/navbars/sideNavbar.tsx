import { FiUser } from "react-icons/fi";
import { GoDiscussionClosed, GoTrophy } from "react-icons/go";
import { LuCode2 } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { RiApps2AddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthStore } from "../../stores/authStore";
import { UiStore } from "../../stores/uiStore";
import NavToggleButton from "../buttons/navToggleButton";

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
                        <Link
                            to={`/profile/${authStore.userProfile?.id}`}
                            className="flex items-center gap-4 hover:underline"
                            title="Profile"
                        >
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
                        <Link to="/problems" className="flex items-center gap-4 hover:underline" title="Problems">
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
                        <Link to="/contest" className="flex items-center gap-4 hover:underline" title="Contest">
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
                        <Link
                            to="/contribute/contribute-type"
                            className="flex items-center gap-4 hover:underline"
                            title="Contribute"
                        >
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
                        <Link to="/blogs" className="flex items-center gap-4 hover:underline" title="Blogs">
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

                    {authStore.userProfile && (
                        <li className="mt-auto mb-4 text-red-600 w-full">
                            <button
                                type="button"
                                className="flex items-center gap-4 hover:underline"
                                onClick={() => authStore.signoutUser()}
                                title="Sign out"
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
                    )}
                </ul>
            </nav>
        </aside>
    );
};
