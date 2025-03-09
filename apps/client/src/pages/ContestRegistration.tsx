import { RegisterContestDetails } from "@repo/common/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuUser2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { AuthStore } from "../stores/authStore";
import { ContestStore } from "../stores/contestStore";

const ContestRegistration = () => {
    const { contestId } = useParams<{ contestId: string }>();
    const [contestDetails, setContestDetails] = useState<RegisterContestDetails | undefined>();
    const contestStore = ContestStore();
    const authStore = AuthStore();
    const navigate = useNavigate();
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
    });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        (async () => {
            const contestDetails = await contestStore.fetchRegisterContestDetails(
                contestId || "",
                authStore.userProfile?.id || undefined,
            );

            if (contestDetails?.status !== "Ongoing") {
                const currentTime = new Date();
                const contestStartTime = new Date(contestDetails?.startTime || "");
                const days = Math.floor((contestStartTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60 * 24));
                const hours = Math.floor((contestStartTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60)) % 24;
                const minutes = Math.floor((contestStartTime.getTime() - currentTime.getTime()) / (1000 * 60)) % 60;
                const seconds = Math.floor((contestStartTime.getTime() - currentTime.getTime()) / 1000) % 60;
                setTimer({
                    days,
                    hours,
                    minutes,
                    seconds,
                    miliseconds: 0,
                });
            }
            setHasStarted(true);
            setContestDetails(contestDetails);
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const { miliseconds, seconds, minutes, hours, days } = timer;

            if (hasStarted && days === 0 && hours === 0 && minutes === 0 && seconds === 0 && miliseconds === 1) {
                window.location.reload();
                return;
            }

            if (miliseconds === 0) {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (hours === 0) {
                            if (days === 0) {
                                clearInterval(interval);
                            } else {
                                setTimer({
                                    days: days - 1,
                                    hours: 23,
                                    minutes: 59,
                                    seconds: 59,
                                    miliseconds: 99,
                                });
                            }
                        } else {
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

    async function handleRegister() {
        if (!authStore.isLoggedIn) {
            toast.error("Login to register for the contest");
            return;
        }

        await contestStore.registerForContest(contestId || "");
    }

    return (
        <div className="Contest Registration Page">
            <SideNavbar />

            <MainWrapper>
                <Header />

                {contestDetails && (
                    <div className="">
                        <div className="pr-14 banner w-full h-[350px] text-center flex flex-col gap-4 items-center justify-center bg-slate-200 dark:bg-slate-900">
                            <h1 className="text-5xl font-semibold">{contestDetails.title}</h1>
                            <h3 className="text-xl space-x-3">
                                <span className="font-medium">{new Date(contestDetails.startTime).toLocaleString()}</span>{" "}
                                <span>To</span>
                                <span className="font-medium">{new Date(contestDetails.endTime).toLocaleString()}</span>
                            </h3>
                            <h3 className="text-lg space-x-4 flex">
                                <span>Created by</span>
                                <div
                                    className="flex items-center justify-center gap-1 hover:underline hover:cursor-pointer"
                                    onClick={() => navigate(`/profile/${contestDetails.createdBy?.id}`)}
                                >
                                    <div className="w-6 h-6 border aspect-square rounded-full overflow-hidden">
                                        {!contestDetails.createdBy?.avatar && !contestDetails.createdBy?.profileImg && (
                                            <LuUser2 />
                                        )}

                                        {(contestDetails.createdBy?.profileImg || contestDetails.createdBy?.avatar) && (
                                            <img
                                                src={contestDetails.createdBy?.profileImg || contestDetails.createdBy?.avatar}
                                                alt="profile image"
                                                className="w-full h-full object-cover aspect-square"
                                            />
                                        )}
                                    </div>
                                    <span>{contestDetails.createdBy.userName}</span>
                                </div>
                            </h3>

                            <div className="flex space-x-10">
                                {!contestDetails.isRegistered ? (
                                    <button
                                        type="button"
                                        className="mt-5 px-5 py-2 min-w-[130px] rounded-xl bg-red-600 text-white text-xl font-semibold hover:cursor-pointer"
                                        onClick={handleRegister}
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <div className="mt-5 px-5 py-2 min-w-[130px] rounded-xl border border-red-600 text-white text-xl font-semibold hover:cursor-pointer">
                                        Already Registerd
                                    </div>
                                )}

                                {contestDetails.status == "Ongoing" && (
                                    <button
                                        type="button"
                                        className="mt-5 px-5 py-2 min-w-[130px] rounded-xl bg-green-600 text-white text-xl font-semibold"
                                        onClick={() => navigate(`/live-contest/${contestId}`)}
                                    >
                                        Start
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="pr-14 contest-starts-in py-20 flex flex-col gap-8 items-center justify-center">
                            <h2 className="text-3xl font-semibold mb-10">
                                {contestDetails.status === "Scheduled" ? "Contest Starts In" : "Contest Started"}
                            </h2>

                            <div className="flex justify-center items-center">
                                {timer.days === 0 &&
                                timer.hours === 0 &&
                                timer.minutes === 0 &&
                                timer.seconds === 0 &&
                                timer.miliseconds === 0 ? (
                                    <div className="flex justify-center items-center">
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">00</h1>
                                            <p className="whitespace-nowrap m-0">Days</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">00</h1>
                                            <p className="whitespace-nowrap m-0">Hours</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">00</h1>
                                            <p className="whitespace-nowrap m-0">Minutes</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">00</h1>
                                            <p className="whitespace-nowrap m-0">Seconds</p>
                                        </div>
                                        <div className="text-center px-8">
                                            <h1 className="text-5xl font-light m-0">00</h1>
                                            <p className="whitespace-nowrap m-0">Mili-Seconds</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center">
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">{timer.days}</h1>
                                            <p className="whitespace-nowrap m-0">Days</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">{timer.hours}</h1>
                                            <p className="whitespace-nowrap m-0">Hours</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">{timer.minutes}</h1>
                                            <p className="whitespace-nowrap m-0">Minutes</p>
                                        </div>
                                        <div className="text-center border-r border-gray-700 px-8">
                                            <h1 className="text-5xl font-light m-0">{timer.seconds}</h1>
                                            <p className="whitespace-nowrap m-0">Seconds</p>
                                        </div>
                                        <div className="text-center px-8">
                                            <h1 className="text-5xl font-light m-0">{timer.miliseconds}</h1>
                                            <p className="whitespace-nowrap m-0">Mili-Seconds</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pr-14 about flex flex-col gap-8 items-center justify-center py-20">
                            <h2 className="text-3xl font-semibold">About Contest</h2>

                            <pre className="w-[60vw] border, text-wrap text-inherit">{contestDetails.description}</pre>
                        </div>
                    </div>
                )}

                {!contestDetails && contestStore.skeletonLoading && <div>Loading...</div>}
            </MainWrapper>
        </div>
    );
};

export default ContestRegistration;
