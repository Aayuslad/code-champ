import { useEffect } from "react";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ProblemStore } from "../stores/problemStore";
import { ProblemSetTable } from "../components/problemSetTable";
import { AuthStore } from "../stores/authStore";

export default function Problems() {
    const authStore = AuthStore();
    const problemStore = ProblemStore();

    useEffect(() => {
        if (problemStore.feedProblems.length === 0) {
            problemStore.getFeedProblems(authStore.userProfile?.id);
        }
    }, []);

    return (
        <div className="Problems Page">
            <SideNavbar />

            <MainWrapper>
                <Header />

                <div className="flex  justify-center">
                    <div className=" w-[1300px] min-w-[100px] flex">
                        {problemStore.feedProblems.length > 0 && (
                            <div className="flex-1 p-4 flex flex-col items-center lg:items-start">
                                <ProblemSetTable />
                            </div>
                        )}

                        {problemStore.feedProblems.length === 0 && <div>Loading...</div>}

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
