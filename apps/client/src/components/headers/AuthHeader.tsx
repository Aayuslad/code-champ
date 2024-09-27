const AuthHeader = () => {
    return (
        <>
            <header className="AuthHeader w-full h-14 flex justify-between items-center px-6 bg-light200 dark:bg-dark200  dark:text-white border-b-4 border-light300 dark:border-dark300">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold dark:text-gray-50 whitespace-break-spaces">
                        Welcome to <span className="font-pacifico dark:text-white text-[1.6rem]">Code Champ</span>
                    </h1>
                </div>
            </header>
        </>
    );
};

export default AuthHeader;
