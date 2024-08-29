import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";

export default function Blogs() {
	return (
		<div className="Blogs Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">Blogs Page</div>
			</MainWrapper>
		</div>
	);
}
