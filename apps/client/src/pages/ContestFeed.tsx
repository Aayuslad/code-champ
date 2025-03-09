import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ContestStore } from "../stores/contestStore";

export default function ContestFeed() {
    const contestStore = ContestStore();
    const navigate = useNavigate();

    useEffect(() => {
        contestStore.fetchContests();
    }, []);

    return (
        <div className="Contest Page">
            <SideNavbar />

            <MainWrapper>
                <Header />

                <div className="flex items-center justify-center gap-3 border-red-500">
                    <div className="banner w-full flex px-[5vw] py-[6vh] bg-slate-100 dark:bg-slate-950">
                        <div className="title flex-1">
                            <h3 className="text-2xl font-semibold">Welcome to</h3>
                            <h1 className="text-5xl font-semibold">Code Champ Contests</h1>
                        </div>
                        <div className="create-contest">
                            <button type="button" className="px-4 py-2 rounded-lg font-semibold bg-light400 dark:bg-dark300">
                                Create Contest
                            </button>
                        </div>
                    </div>
                </div>

                <div className="public-contests px-10 py-8">
                    <h2 className="text-xl font-semibold">Upcoming Public Contests</h2>

                    <div className="flex my-3 gap-2">
                        {contestStore.contests &&
                            contestStore.contests.map(contest => (
                                <div
                                    key={contest.id}
                                    className="px-6 py-4 border-2 border-light400 dark:border-dark300 rounded-lg min-w-[320px] max-w-[400px]"
                                >
                                    <h3 className="font-semibold text-lg">{contest.title}</h3>
                                    <p>starts on {new Date(contest.startTime).toDateString()}</p>{" "}
                                    <button
                                        type="button"
                                        className="bg-light400 dark:bg-dark300 px-3 py-1 mt-6 rounded-lg block ml-auto font-semibold"
                                        onClick={() => navigate(`/contest-registration/${contest.id}`)}
                                    >
                                        Explore More
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </MainWrapper>
        </div>
    );
}
