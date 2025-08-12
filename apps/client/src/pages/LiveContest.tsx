import { LiveContestDetails } from "@repo/common/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ContestStore } from "../stores/contestStore";
import { LuUser } from "react-icons/lu";

export default function LiveContest() {
    const contestStore = ContestStore();
    const { contestId } = useParams<{ contestId: string }>();
    const contestDetails = contestStore.liveContestDetails;
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
            if (contestId == contestStore.liveContestDetails?.id) return;
            await contestStore.fetchLiveContestDetails(contestId || "");
        })();
    }, [contestId]);

    useEffect(() => {
        const currentTime = new Date();
        const contestEndTime = new Date(
            new Date(contestDetails?.joinedAt as Date).getTime() + Number(contestDetails?.durationMs),
        );

        let timeDiff = 0;
        if (currentTime.getTime() <= contestEndTime.getTime()) {
            timeDiff = contestEndTime.getTime() - currentTime.getTime();
        }

        if (timeDiff <= 0) {
            setTimer({
                hours: 0,
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            });
        } else {
            const hours = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDiff / 1000) % 60);
            setTimer({
                hours,
                minutes,
                seconds,
                miliseconds: 0,
            });
        }

        setHasStarted(true);
    }, [contestStore.liveContestDetails]);

    useEffect(() => {
        async function updateLeaderboard() {
            await contestStore.updateLeaderBoard(contestId || "");
        }

        const interval = setInterval(updateLeaderboard, 10000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const { miliseconds, seconds, minutes, hours } = timer;

            if (hours <= 0 && minutes <= 0 && seconds <= 0 && miliseconds <= 0) {
                clearInterval(interval);
                return;
            }

            if (miliseconds === 0) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (hours > 0) {
                            setTimer({
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
                            <div className="flex-1">
                                <h1 className="text-2xl font-semibold mx-10">{contestDetails.title}</h1>
                                {contestDetails.bestOf && contestDetails.bestOf > 0 && (
                                    <p className="text-md mx-10">
                                        Note: Best of {contestDetails.bestOf} problems will be considered for scoring.
                                    </p>
                                )}
                            </div>

                            <div className="clock flex-1 flex flex-col items-center justify-center">
                                <h3 className="text-xl font-semibold pb-4">Time Remaining</h3>

                                <div
                                    className={`flex justify-center items-center ${timer.hours === 0 && timer.minutes <= 1 ? "text-red-500" : ""}`}
                                >
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
                            <div className="questions flex-1 flex flex-col items-center pr-[120px]">
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-left mt-6">Problems</h3>
                                    <h3 className="w-[250px] mt-6 text-lg whitespace-pre text-right">{`Total Scored Points:  ${contestDetails.yourScore}`}</h3>
                                </div>

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
                                        {contestDetails?.problems
                                            .sort((a, b) => a.order - b.order)
                                            .map((problem, index) => (
                                                <tr
                                                    key={index}
                                                    className={`h-10 backdrop:blur-md ${index % 2 ? "bg-lightTableRow2 dark:bg-darkTableRow2" : "bg-lightTableRow1 dark:bg-darkTableRow1"} rounded-lg cursor-pointer`}
                                                    onClick={() => {
                                                        navigate(
                                                            `/live-contest/${contestId}/solve-problem/${problem.contestProblemId}/${contestDetails.participantId}/Problem/Code`,
                                                        );
                                                    }}
                                                >
                                                    <td className="rounded-l-lg text-center">{index + 1}</td>
                                                    <td className="text-center">
                                                        {problem.attemptState === "Accepted" && (
                                                            <span title="Accepted" className="text-green-600">
                                                                ✔
                                                            </span>
                                                        )}
                                                        {problem.attemptState === "Attempted" && (
                                                            <span title="Attempted" className="text-yellow-600">
                                                                ~
                                                            </span>
                                                        )}
                                                        {problem.attemptState === "Not Attempted" && (
                                                            <span title="Not Attempted">-</span>
                                                        )}
                                                    </td>

                                                    <td>{problem.title}</td>
                                                    <td className="rounded-r-lg text-center">{`${problem.scoredPoints} / ${problem.points}`}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="leaderbord w-[450px] flex flex-col">
                                <div className="flex items-center gap-2 mt-6">
                                    <h3 className="text-xl font-semibold">Leader Board</h3>
                                    <div className="relative group">
                                        <div className="cursor-help w-5 h-5 rounded-full border border-current flex items-center justify-center">
                                            <span className="text-sm">i</span>
                                        </div>
                                        <div className="absolute left-0 w-48 bg-white dark:bg-slate-800 p-2 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                                            Leaderboard updates every 10 seconds
                                        </div>
                                    </div>
                                </div>

                                <table className="w-full border-separate border-spacing-y-3">
                                    <thead>
                                        <tr className="h-10 backdrop:blur-md rounded-lg font-semibold">
                                            <th className="font-semibold w-[20%]">Rank</th>
                                            <th className="font-semibold w-[30%]">Score</th>
                                            <th className="font-semibold w-[50%]">Enrollment Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contestDetails?.leaderBoard.map((participant, index) => (
                                            <tr key={index}>
                                                <td className="text-center mb-3">{participant.score === 0 ? "-" : index + 1}</td>
                                                <td className="text-center mb-3">{participant.score}</td>
                                                {/* <td
                                                    className="text-center flex justify-center items-center gap-2 hover:cursor-pointer"
                                                    onClick={() => window.open(`/profile/${participant.userId}`, "_blank")}
                                                >
                                                    <span className="Profile h-7 w-7 p-0 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-light300 dark:border-dark300 text-xl">
                                                        {!participant.avatar && !participant?.profileImg && <LuUser />}

                                                        {(participant.profileImg || participant.avatar) && (
                                                            <img
                                                                src={participant.profileImg || participant.avatar}
                                                                alt="profile image"
                                                                className="w-full h-full object-cover aspect-square"
                                                            />
                                                        )}
                                                    </span>
                                                    <span>{participant.userName}</span>
                                                </td> */}
                                                <td className="text-center mb-3">{participant.enrollmentNum}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {!contestDetails && contestStore.skeletonLoading && (
                    <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center">Loading...</div>
                )}
            </MainWrapper>
        </div>
    );
}
