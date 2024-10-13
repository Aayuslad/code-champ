import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../stores/authStore";
import { ThemeChanger } from "../themeChanger";
import { LuUser2 } from "react-icons/lu";

export const Header = () => {
    const authStore = AuthStore();
    const navigate = useNavigate();

    return (
        <div className="Header w-full h-14 px-5 border-b-2 flex items-center bg-light200 dark:bg-dark200 border-light300 dark:border-dark300">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-black dark:text-white">
                    <a href="/" className="font-pacifico">
                        Code Champ
                    </a>
                </div>
            </div>

            <div className="mx-4 ml-auto">
                <ThemeChanger />
            </div>

            <div className="mx-3 flex gap-3">
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
                            className="px-4 py-1 border border-green-500 rounded-[100vh]"
                            onClick={() => navigate("/signin")}
                        >
                            Sign in
                        </button>
                    </>
                )}
            </div>

            {authStore.isLoggedIn && (
                <div
                    className="Profile mr-4 h-9 w-9 p-0 rounded-full aspect-square flex items-center justify-center overflow-hidden cursor-pointer border border-light300 dark:border-dark300 text-xl"
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
