import { useEffect, useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import ProblemSearchBox from "../../inputs/problemSearchBox";
import { ProblemStore } from "../../../stores/problemStore";
import { ProbelmSearchResultType } from "@repo/common/zod";
import { useNavigate } from "react-router-dom";

export const ProblemSearch = () => {
    const [searchResult, setSearchResult] = useState<ProbelmSearchResultType[]>([]);
    const [searchKey, setSearchKey] = useState("");
    const debouncedSearchKey = useDebounce(searchKey, 500);
    const problemStore = ProblemStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedSearchKey === "") {
            setSearchResult([]);
            return;
        }

        const fetchSearchResults = async () => {
            const result = await problemStore.searchProblem(debouncedSearchKey as string);
            setSearchResult(result || []);
        };

        fetchSearchResults();
    }, [debouncedSearchKey]);

    return (
        <>
            <div className=" basis-[50%] p-8 flex flex-col items-center justify-center space-y-6">
                <h2 className="text-2xl font-bold">Find Your Problem to Contribute Test Cases</h2>
                <svg
                    className="w-16 h-16 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
                <p className="text-gray-400 text-center max-w-lg">
                    Welcome to the problem search page! Use the search bar on the right to quickly locate the problem you want to
                    contribute test cases for. You can search by the problem's title or problem ID.
                </p>
                <p className="text-gray-400 text-center max-w-lg">
                    Once you find the problem, select it to proceed to the test case contribution section. Your contributions help
                    improve the quality and variety of coding challenges for everyone. Thank you for being a part of our
                    community!
                </p>
            </div>
            <div className=" basis-[50%] flex flex-col items-center justify-center gap-6">
                <ProblemSearchBox searchKey={searchKey} setSearchKey={setSearchKey} width="500px" />

                <div className="search-result-box  w-[70%]">
                    {searchResult.length > 0 ? (
                        <ul>
                            {searchResult.map(problem => (
                                <li
                                    key={problem.id}
                                    className="py-2 text-base"
                                    onClick={() =>
                                        navigate(`/contribute/test-case-contribution`, { state: { problemId: problem.id } })
                                    }
                                >
                                    <button type="button" className="flex justify-between items-center w-full">
                                        <span className="w-16">{problem.problemNumber}</span>
                                        <div className="text-left flex-1 hover:underline">{problem.title}</div>
                                        <div className="ml-4">{`->`}</div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            {problemStore.skeletonLoading && <p className="text-center">Loading...</p>}
                            {!problemStore.skeletonLoading && debouncedSearchKey !== "" && <p className="text-center">No results found</p>}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
