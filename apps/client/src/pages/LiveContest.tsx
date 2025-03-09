import { LiveContestDetails } from "@repo/common/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ContestStore } from "../stores/contestStore";

export default function LiveContest() {
    const contestStore = ContestStore();
    const { contestId } = useParams<{ contestId: string }>();
    const [contestDetails, setContestDetails] = useState<LiveContestDetails | undefined>();
    const [timer, setTimer] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
    });
    const [hasStarted, setHasStarted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const contestDetails = await contestStore.fetchLiveContestDetails(contestId || "");
            setContestDetails(contestDetails);
            setHasStarted(true);

            const currentTime = new Date();
            const contestEndTime = new Date(contestDetails?.endTime || "");
            const hours = Math.floor((contestEndTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor((contestEndTime.getTime() - currentTime.getTime()) / (1000 * 60)) % 60;
            const seconds = Math.floor((contestEndTime.getTime() - currentTime.getTime()) / 1000) % 60;
            setTimer({
                hours,
                minutes,
                seconds,
                miliseconds: 0,
            });
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const { miliseconds, seconds, minutes, hours } = timer;

            if (miliseconds === 0) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (hours === 0) {
                            clearInterval(interval);

                            setTimer({
                                ...timer,
                                hours: hours - 1,
                                minutes: 59,
                                seconds: 59,
                                miliseconds: 99,
                            });
                        }
                    } else {
                        setTimer({
                            ...timer,
                            minutes: minutes - 1,
                            seconds: 59,
                            miliseconds: 99,
                        });
                    }
                } else {
                    setTimer({
                        ...timer,
                        seconds: seconds - 1,
                        miliseconds: 99,
                    });
                }
            } else {
                setTimer({
                    ...timer,
                    miliseconds: miliseconds - 1,
                });
            }
        }, 10);

        return () => clearInterval(interval);
    }, [timer, hasStarted]);

    return (
        <div className="Blogs Page">
            <SideNavbar />

            <MainWrapper>
                <Header />

                {contestDetails && (
                    <div className="">
                        <div className="header py-10 flex items-center bg-slate-100 dark:bg-slate-900">
                            <h1 className="flex-1 text-2xl font-semibold mx-10">{contestDetails.title}</h1>

                            <div className="clock flex-1 flex flex-col items-center justify-center">
                                <h3 className="text-xl font-semibold pb-4">Time Remaining</h3>

                                <div className="flex justify-center items-center">
                                    <div className="text-center border-r border-gray-700 px-8">
                                        <h1 className="text-3xl font-light m-0">{timer.hours}</h1>
                                        <p className="whitespace-nowrap m-0">Hours</p>
                                    </div>
                                    <div className="text-center border-r border-gray-700 px-8">
                                        <h1 className="text-3xl font-light m-0">{timer.minutes}</h1>
                                        <p className="whitespace-nowrap m-0">Minutes</p>
                                    </div>
                                    <div className="text-center border-r border-gray-700 px-8">
                                        <h1 className="text-3xl font-light m-0">{timer.seconds}</h1>
                                        <p className="whitespace-nowrap m-0">Seconds</p>
                                    </div>
                                    <div className="text-center px-8">
                                        <h1 className="text-3xl font-light m-0">{timer.miliseconds}</h1>
                                        <p className="whitespace-nowrap m-0">Mili-Seconds</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main-container flex lg:px-[100px]">
                            <div className="questions flex-1 flex flex-col items-center pr-[80px]">
                                <h3 className="text-xl font-semibold w-full text-left mx-10 mt-6">Problems</h3>

                                <table className="w-full max-w-[800px] border-separate border-spacing-y-3">
                                    <thead>
                                        <tr className="h-10 backdrop:blur-md rounded-lg font-semibold">
                                            <th className="font-semibold w-[5%]">#</th>
                                            <th className="font-semibold w-[10%]">Status</th>
                                            <th className="font-semibold w-[65%]">Title</th>
                                            <th className="font-semibold w-[20%]">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contestDetails?.problems.map((problem, index) => (
                                            <tr
                                                key={index}
                                                className={`h-10 backdrop:blur-md ${index % 2 ? "bg-lightTableRow2 dark:bg-darkTableRow2" : "bg-lightTableRow1 dark:bg-darkTableRow1"} rounded-lg cursor-pointer`}
                                                onClick={() => {
                                                    console.log(contestId);
                                                    navigate(
                                                        `/live-contest/${contestId}/solve-problem/${problem.contestProblemId}/${contestDetails.participantId}/Problem/Code`,
                                                    );
                                                }}
                                            >
                                                <td className="rounded-l-lg text-center">{index + 1}</td>
                                                {/* // todo figure out this, is probblem solved or not thing */}
                                                <td className="text-center">{problem.isSolved ? "✓" : "-"}</td>
                                                <td>{problem.title}</td>
                                                <td className="rounded-r-lg text-center">{problem.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="leaderbord w-[450px] flex justify-center ">
                                <h3 className="text-xl font-semibold w-full text-left mt-6">Leader Bord</h3>
                            </div>
                        </div>
                    </div>
                )}
            </MainWrapper>
        </div>
    );
}

const date = new Date().toISOString();
