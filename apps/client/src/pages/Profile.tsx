import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/headers/hader";
import { SideNavbar } from "../components/navbars/sideNavbar";
import MainWrapper from "../components/wrappers/mainWrapper";
import { useEffect, useState } from "react";
import { AuthStore } from "../stores/authStore";
import { LuUser2 } from "react-icons/lu";
import { WholeUserProfile } from "@repo/common/zod";
import { HalfCircleGraph } from "../components/HalfCircleGraph";
import { idToLanguageMappings } from "../config/languageIdMppings";
import { Navbar02 } from "../components/navbars/navbar02";

export default function Profile() {
    const { userId } = useParams<{ userId: string }>();
    const [userProfile, setUserProfile] = useState<WholeUserProfile | undefined>(undefined);
    const [difficultyNav, setDifficultyNav] = useState<string>("Basic");
    const authStore = AuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) return;
        (async () => {
            const userProfile = await authStore.fetchWholeUserProfile(userId);
            setUserProfile(userProfile);
        })();
    }, [userId]);

    const sampleData = [
        { value: userProfile?.basicSolvedCount || 0, color: "#22c55e", total: userProfile?.totalBasic || 100 }, // Gold
        { value: userProfile?.easySolvedCount || 0, color: "#3b82f6", total: userProfile?.totalEasy || 100 }, // Green Yellow
        { value: userProfile?.mediumSolvedCount || 0, color: "#eab308", total: userProfile?.totalMedium || 100 }, // Deep Sky Blue
        { value: userProfile?.hardSolvedCount || 0, color: "#ef4444", total: userProfile?.totalHard || 100 }, // Orange Red
    ];

    return (
        <div className="Home Page">
            <SideNavbar />

            <MainWrapper>
                <Header />

                <div className="flex justify-center h-fi">
                    {!userProfile && <div className="flex h-full w-full items-center justify-center">Loading...</div>}

                    {userProfile && (
                        <div className="w-[1250px] min-w-[100px] flex flex-col items-center justify-start ">
                            <div className="row1 h-fit w-full flex items-center justify-center ">
                                <div className="col1 h-[250px] m-6 mr-3 w-full rounded-xl shadow-lg flex items-center justify-around bg-lightTableRow1 dark:bg-darkTableRow2">
                                    <div></div>

                                    <div className="img border-4 border-gray-300 dark:border-gray-400 aspect-square h-[170px] w-[170px] rounded-full flex items-center justify-center text-[120px] text-gray-400 dark:text-gray-500">
                                        {!userProfile.profileImg && !userProfile.avatar && <LuUser2 />}

                                        {(userProfile.profileImg || userProfile.avatar) && (
                                            <img
                                                src={userProfile.profileImg || userProfile.avatar}
                                                alt="profile image"
                                                className="w-full h-full object-cover aspect-square rounded-full"
                                            />
                                        )}
                                    </div>

                                    <div className="details space-y-3 text-inerit dark:text-white">
                                        <h2 className="text-3xl font-bold">{userProfile.name}</h2>
                                        <p className="text-base opacity-80 flex items-center">
                                            <span className="mr-2">@</span>
                                            {userProfile.userName}
                                        </p>
                                        <p className="text-base opacity-80 flex items-center">
                                            <span className="mr-2">📧</span>
                                            {userProfile.email}
                                        </p>
                                        <div className="flex space-x-10">
                                            <div>
                                                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Points</p>
                                                <p className="text-3xl font-bold">{userProfile.points}</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Rank</p>
                                                <p className="text-3xl font-bold">{userProfile.rank}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div></div>
                                </div>

                                <div className="col2 h-[250px] w-full rounded-xl m-6 ml-3 bg-lightTableRow1 dark:bg-darkTableRow2 flex items-center justify-around">
                                    <div></div>
                                    <HalfCircleGraph
                                        data={sampleData}
                                        total={userProfile.totalProblems}
                                        solved={userProfile.solved}
                                    />
                                    <div className="flex flex-col gap-5">
                                        <div className="flex gap-5">
                                            <div className="py-1.5 w-[100px] font-semibold text-center rounded-lg bg-lightTableRow1 dark:bg-darkTableRow1">
                                                <div className="text-green-500">Basic</div>
                                                <div className="text-sm">
                                                    {userProfile.basicSolvedCount}/{userProfile.totalBasic}
                                                </div>
                                            </div>
                                            <div className="py-1.5 w-[100px] font-semibold text-center rounded-lg bg-lightTableRow1 dark:bg-darkTableRow1">
                                                <div className="text-blue-500">Easy</div>
                                                <div className="text-sm">
                                                    {userProfile.easySolvedCount}/{userProfile.totalEasy}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-5">
                                            <div className="py-1.5 w-[100px] font-semibold text-center rounded-lg bg-lightTableRow1 dark:bg-darkTableRow1">
                                                <div className="text-yellow-500">Meid.</div>
                                                <div className="text-sm">
                                                    {userProfile.mediumSolvedCount}/{userProfile.totalMedium}
                                                </div>
                                            </div>
                                            <div className="py-1.5 w-[100px] font-semibold text-center rounded-lg bg-lightTableRow1 dark:bg-darkTableRow1">
                                                <div className="text-red-500">Hard</div>
                                                <div className="text-sm">
                                                    {userProfile.hardSolvedCount}/{userProfile.totalHard}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>

                            <div className="row2 h-fit w-full flex items-start justify-center">
                                <div className="col1 basis-[25%] h-fit m-6 p-3 px-4 mt-0 mr-3 rounded-xl bg-lightTableRow1 dark:bg-darkTableRow2">
                                    <div className="space-y-5 pt-2 pb-6">
                                        <h3 className="text-xl font-semibold">Languages Used</h3>
                                        {userProfile.languageIdCounts.map((lang, index) => {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        className="w-fit inline-flex items-center justify-center border px-2.5 rounded-2xl mx-1 my-1 text-sm font-semibold cursor-pointer border-gray-400 dark:border-gray-600"
                                                    >
                                                        <span className={`pb-1.5 pt-0.5`}>
                                                            {idToLanguageMappings[lang.languageId]}
                                                        </span>
                                                    </div>{" "}
                                                    × {lang.count}
                                                </>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-5 pt-6 py-4">
                                        <h3 className="text-xl font-semibold">Skills</h3>
                                        <div>
                                            {userProfile.skillCounts.map((skill, index) => {
                                                return (
                                                    <div className="inline-flex my-1.5 mr-2" key={index}>
                                                        <span
                                                            key={index}
                                                            className="w-fit items-center justify-center border px-2.5 pt-1 pb-1.5 rounded-2xl mx-1 text-xs font-semibold border-gray-400 dark:border-gray-600"
                                                        >
                                                            {skill.skill}
                                                        </span>
                                                        <span> ×{skill.count}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="col2 basis-[75%]  m-6 mt-0 ml-3 flex flex-col">
                                    <div className="subRow1 rounded-xl h-[200px] mb-6 bg-lightTableRow1 dark:bg-darkTableRow2"></div>

                                    <div className="subRow2 rounded-xl min-h-[300px] h-fit flex flex-col bg-lightTableRow1 dark:bg-darkTableRow2">
                                        <div className="px-6 py-4">
                                            <Navbar02
                                                navs={["Basic", "Easy", "Medium", "Hard"]}
                                                currentNav={difficultyNav}
                                                setCurrentNav={setDifficultyNav}
                                            />
                                        </div>

                                        <div className="px-10 grid grid-cols-2 gap-4">
                                            {difficultyNav === "Basic" &&
                                                userProfile.basicSolved.length > 0 &&
                                                userProfile.basicSolved.map((problem, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${index % 2 === 0 ? "col-start-1" : "col-start-2"} cursor-pointer`}
                                                        onClick={() => navigate(`/solve-problem/${problem.id}/Problem/Code`)}
                                                    >
                                                        {problem.title}
                                                    </li>
                                                ))}

                                            {difficultyNav === "Basic" && userProfile.basicSolved.length === 0 && (
                                                <div className="col-span-2 text-center h-[200px] flex items-center justify-center text-gray-700 dark:text-gray-300">
                                                    No problems solved yet. Our server is feeling a bit unloved
                                                </div>
                                            )}

                                            {difficultyNav === "Easy" &&
                                                userProfile.easySolved.length > 0 &&
                                                userProfile.easySolved.map((problem, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${index % 2 === 0 ? "col-start-1" : "col-start-2"} cursor-pointer`}
                                                        onClick={() => navigate(`/solve-problem/${problem.id}/Problem/Code`)}
                                                    >
                                                        {problem.title}
                                                    </li>
                                                ))}

                                            {difficultyNav === "Easy" && userProfile.easySolved.length === 0 && (
                                                <div className="col-span-2 text-center h-[200px] flex items-center justify-center text-gray-700 dark:text-gray-300">
                                                    No problems solved yet. Our server is feeling a bit unloved
                                                </div>
                                            )}

                                            {difficultyNav === "Medium" &&
                                                userProfile.mediumSolved.length > 0 &&
                                                userProfile.mediumSolved.map((problem, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${index % 2 === 0 ? "col-start-1" : "col-start-2"} cursor-pointer`}
                                                        onClick={() => navigate(`/solve-problem/${problem.id}/Problem/Code`)}
                                                    >
                                                        {problem.title}
                                                    </li>
                                                ))}

                                            {difficultyNav === "Medium" && userProfile.mediumSolved.length === 0 && (
                                                <div className="col-span-2 text-center h-[200px] flex items-center justify-center text-gray-700 dark:text-gray-300">
                                                    No problems solved yet. Our server is feeling a bit unloved
                                                </div>
                                            )}

                                            {difficultyNav === "Hard" &&
                                                userProfile.hardSolved.length > 0 &&
                                                userProfile.hardSolved.map((problem, index) => (
                                                    <li
                                                        key={index}
                                                        className={`${index % 2 === 0 ? "col-start-1" : "col-start-2"} cursor-pointer`}
                                                        onClick={() => navigate(`/solve-problem/${problem.id}/Problem/Code`)}
                                                    >
                                                        {problem.title}
                                                    </li>
                                                ))}

                                            {difficultyNav === "Hard" && userProfile.hardSolved.length === 0 && (
                                                <div className="col-span-2 text-center h-[200px] flex items-center justify-center text-gray-700 dark:text-gray-300">
                                                    No problems solved yet. Our server is feeling a bit unloved
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </MainWrapper>
        </div>
    );
}
