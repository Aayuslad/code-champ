import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../stores/authStore";
import { ThemeChanger } from "../themeChanger";

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
        </div>
    );
};
