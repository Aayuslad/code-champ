import { LiveContestDetails } from "@repo/common/zod";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { ContestStore } from "../stores/contestStore";
import { LuUser2 } from "react-icons/lu";

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

            const currentTime = new Date();
            const contestEndTime = new Date(contestDetails?.endTime || "");
            const timeDiff = contestEndTime.getTime() - currentTime.getTime();

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

            setContestDetails(contestDetails);
            setHasStarted(true);
        })();
    }, [contestId]);

    useEffect(() => {
        async function updateLeaderboard() {
            const leaderBoard = await contestStore.getLeaderBoard(contestId || "");
            if (!leaderBoard) return;
            setContestDetails(prevDetails => (prevDetails ? { ...prevDetails, leaderBoard } : undefined));
        }

        const interval = setInterval(updateLeaderboard, 5000);

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
                            <div className="questions flex-1 flex flex-col items-center pr-[120px]">
                                <div className="w-full flex justify-between items-center">
                                    <h3 className="text-xl font-semibold text-left mt-6">Problems</h3>
                                    <h3 className="w-[200px] mt-6 text-lg whitespace-pre text-right">{`Your Score  ${contestDetails.yourScore}`}</h3>
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
                                        {contestDetails?.problems.map((problem, index) => (
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
                                                <td className="text-center">{problem.isSolved ? "✓" : "-"}</td>
                                                <td>{problem.title}</td>
                                                <td className="rounded-r-lg text-center">{problem.points}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="leaderbord w-[450px] flex flex-col">
                                <h3 className="text-xl font-semibold w-full text-left mt-6">Leader Board</h3>
                                <table className="w-full border-separate border-spacing-y-3">
                                    <thead>
                                        <tr className="h-10 backdrop:blur-md rounded-lg font-semibold">
                                            <th className="font-semibold w-[20%]">Rank</th>
                                            <th className="font-semibold w-[30%]">Score</th>
                                            <th className="font-semibold w-[50%]">Participant</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contestDetails?.leaderBoard.map((participant, index) => (
                                            <tr key={index}>
                                                <td className="text-center mb-3">{participant.score === 0 ? "-" : index + 1}</td>
                                                <td className="text-center mb-3">{participant.score}</td>
                                                <td
                                                    className="text-center flex justify-center items-center gap-2 hover:cursor-pointer"
                                                    onClick={() => window.open(`/profile/${participant.userId}`, "_blank")}
                                                >
                                                    <span className="Profile h-7 w-7 p-0 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-light300 dark:border-dark300 text-xl">
                                                        {!participant.avatar && !participant?.profileImg && <LuUser2 />}

                                                        {(participant.profileImg || participant.avatar) && (
                                                            <img
                                                                src={participant.profileImg || participant.avatar}
                                                                alt="profile image"
                                                                className="w-full h-full object-cover aspect-square"
                                                            />
                                                        )}
                                                    </span>
                                                    <span>{participant.userName}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </MainWrapper>
        </div>
    );
}
