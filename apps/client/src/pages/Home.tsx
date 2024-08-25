import { Header } from "../components/hader";
import { SideNavbar } from "../components/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";

export default function Home() {
	return (
		<div className="Home Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">Home Page</div>
			</MainWrapper>
		</div>
	);
}
