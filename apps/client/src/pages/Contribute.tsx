import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";

export default function Contribute() {

	return (
		<div className="Contribute Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">
					<div>Contribute</div>
				</div>
			</MainWrapper>
		</div>
	);
}
