const AuthHeader = () => {
  return (
    <>
      <header className="flex justify-between items-center p-1 bg-light200 dark:bg-dark200 dark:text-white border-b border-gray-500">
        <div className="flex items-center">
          <img src="your-logo-url.png" alt="Logo" className="h-10 w-10 mr-4" />
          <h1 className="text-2xl font-semibold">Welcome to CodeChamp</h1>
        </div>
      </header>
    </>
  );
};

export default AuthHeader;
