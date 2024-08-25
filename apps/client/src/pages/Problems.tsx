import { Header } from "../components/hader";
import { SideNavbar } from "../components/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";

export default function Problems() {

	return (
		<div className="Problems Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">
					<div>problems</div>
				</div>
			</MainWrapper>
		</div>
	);
}