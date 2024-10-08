import { useNavigate } from "react-router-dom";
import { AuthStore } from "../../stores/authStore";
import { ThemeChanger } from "../themeChanger";

type props = {
    problemNumber: number;
    title: string;
};

export const PorblemPageHeader = ({ problemNumber, title }: props) => {
    const navigate = useNavigate();
    const authStore = AuthStore();

    return (
        <div className="Header w-full flex-1 h-12 px-5 border-b-2 flex items-center gap-2 bg-light200 dark:bg-dark200 border-light300 dark:border-dark300">
            <h1 className="text-2xl font-semibold space-x-2">
                <span>{`#${problemNumber}`}</span> <span>{title}</span>
            </h1>

            <div className="mx-3 flex gap-3 ml-auto">
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

            <div className="">
                <ThemeChanger />
            </div>

            {/* // TODO: add logo Here

			// TODO: crete serch component with icon ( left side ) and placeholder, keep corner rounded

			// TODO: add daily stike count componet here with Rocket icon

			// TODO: add profile icon with username here

			// TODO: signin ( transparant, blue border)  and Signup ( blue ) buttons.

			// NOTE: if user has not signed up only show logo and signin Signup buttons */}
        </div>
    );
};
