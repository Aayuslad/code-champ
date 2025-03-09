import { useNavigate } from "react-router-dom";
import { ThemeChanger } from "../themeChanger";

const AuthHeader = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className="AuthHeader w-full h-14 flex justify-between items-center px-6 bg-light200 dark:bg-dark200  dark:text-white border-b-4 border-light300 dark:border-dark300">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-3xl font-bold dark:text-gray-50 whitespace-break-spaces">
                        Welcome to <span onClick={() => navigate("/")} className="font-pacifico dark:text-white text-[1.6rem] hover:cursor-pointer">Code Champ</span>
                    </h1>

                    <ThemeChanger />
                </div>
            </header>
        </>
    );
};

export default AuthHeader;
