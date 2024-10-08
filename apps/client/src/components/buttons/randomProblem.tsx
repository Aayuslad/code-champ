import { GiDiceFire } from "react-icons/gi";
import { ProblemStore } from "../../stores/problemStore";
import { useNavigate } from "react-router-dom";

export function RandomProblemButton() {
    const navigate = useNavigate();
    const problemStore = ProblemStore();

    const handleRandomProblem = () => {
        const randomProblemIndex = Math.floor(Math.random() * problemStore.feedProblems.length);
        const randomProblem = problemStore.feedProblems[randomProblemIndex];
        navigate(`/solve-problem/${randomProblem.id}/Problem/Code`);
    };

    return (
        <button type="button" className="flex ml-auto gap-2 items-center text-green-600 font-semibold" onClick={handleRandomProblem}>
            <div className="text-3xl text-green-600">
                <GiDiceFire />
            </div>
            Random
        </button>
    );
}
