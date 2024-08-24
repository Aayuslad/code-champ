import { Header } from "../hader";
import { SideNavbar } from "../side-navbar";

export const DefaultPage = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="DefaultPage w-screen h-fit min-h-screen flex flex-row bg-white dark:bg-[#030712] text-black dark:text-white">
			<SideNavbar />

			<div className="ml-20 w-[calc(100vw-5rem)]">
				<Header />
				<div className="max-w-full overflow-x-hidden">{children}</div>
			</div>
		</div>
	);
};
