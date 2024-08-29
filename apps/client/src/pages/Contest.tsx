import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";

export default function Contest() {
	return (
		<div className="Contest Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">
					<div>Contest</div>
				</div>
			</MainWrapper>
		</div>
	);
}
