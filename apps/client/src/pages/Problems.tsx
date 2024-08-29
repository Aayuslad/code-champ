import { useEffect } from "react";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ProblemStore } from "../stores/problemStore";
import { ProblemSetTable } from "../components/problemSetTable";

export default function Problems() {
	const problemStore = ProblemStore();

	useEffect(() => {
		if (problemStore.problems.length === 0) {
			problemStore.getProblems();
		}
	}, []);

	return (
		<div className="Problems Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center">
					<div className=" w-[1300px] min-w-[100px] flex">
						<div className="flex-1 p-4 flex flex-col items-center lg:items-start">
							<ProblemSetTable />
						</div>

						<div className="sideBar lg:w-[350px] xl:w-[400px] hidden lg:block"></div>
					</div>
				</div>
			</MainWrapper>
		</div>
	);
}

// TODO: add solved Q round graph
// TODO: add top 3 popular
// TODO: add problem of the day
