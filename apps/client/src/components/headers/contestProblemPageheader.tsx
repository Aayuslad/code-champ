import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../stores/authStore";
import { ThemeChanger } from "../themeChanger";
import { LuUser2 } from "react-icons/lu";
import { IoChevronBackOutline } from "react-icons/io5";

type props = {
    order: number;
    title: string;
    contestId: string;
};

export const ContestPorblemPageHeader = ({ order, title, contestId }: props) => {
    const navigate = useNavigate();
    const authStore = AuthStore();

    return (
        <div className="Header w-full flex-1 h-12 px-4 border-b-2 flex items-center justify-center gap-2 bg-light200 dark:bg-dark200 border-light300 dark:border-dark300">
            <button
                type="button"
                className="text-xl px-1 py-1 pr-1.5 mr-2 rounded-full bg-light400 dark:bg-dark300 hover:cursor-pointer"
                onClick={() => navigate(`/live-contest/${contestId}`)}
            >
                <IoChevronBackOutline />
            </button>

            <h1 className="text-2xl font-semibold space-x-2">
                <span>{`#${order}`}</span> <span>{title}</span>
            </h1>

            <div className="mx-3 flex gap-3 ml-auto">
                <span className="text-green-400 text-xl">Inside a Contest</span>
                {!authStore.userProfile && (
                    <>
                        <button
                            type="button"
                            className="px-4 py-1 bg-green-500 rounded-[100vh] text-white font-semibold"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </button>
                        <button
                            type="button"
                            className="px-4 py-1 border border-green-500 rounded-[100vh] font-semibold"
                            onClick={() => navigate("/signin")}
                        >
                            Sign in
                        </button>
                    </>
                )}
            </div>

            <div className="">
                <ThemeChanger />
            </div>

            {authStore.isLoggedIn && (
                <div
                    className="Profile mr-4 ml-4 h-8 w-8 p-0 rounded-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer border border-light300 dark:border-dark300 text-xl"
                    onClick={() => navigate(`/profile/${authStore.userProfile?.id}`)}
                >
                    {!authStore.userProfile?.avatar && !authStore.userProfile?.profileImg && <LuUser2 />}

                    {(authStore.userProfile?.profileImg || authStore.userProfile?.avatar) && (
                        <img
                            src={authStore.userProfile?.profileImg || authStore.userProfile?.avatar}
                            alt="profile image"
                            className="w-full h-full object-cover aspect-square"
                        />
                    )}
                </div>
            )}
        </div>
    );
};
