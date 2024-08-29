import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProblemStore } from "../stores/problemStore";
import { RandomProblemButton } from "./buttons/randomProblem";
import CustomDropdown from "./inputs/CustomDropDwon";
import ProblemSearchBox from "./inputs/problemSearchBox";

export function ProblemSetTable() {
	const problemStore = ProblemStore();
	const navigate = useNavigate();
	const [difficulty, setDifficulty] = useState("Difficulty");
	const [topicTag, setTopicTag] = useState("TopicTag");

	return (
		<div className="problemsTable w-full">
			<form className="searchAndFilterBar w-full max-w-[800px] flex gap-2 items-center">
				<ProblemSearchBox />

				<CustomDropdown
					minWidth="100px"
					options={["Baic", "Easy", "Medium", "Hard"]}
					selectedOption={difficulty}
					setSelectedOption={setDifficulty}
				/>

				<CustomDropdown
					minWidth="100px"
					options={["Recursion", "Sorting", "Array", "Etc."]}
					selectedOption={topicTag}
					setSelectedOption={setTopicTag}
				/>

				<RandomProblemButton />
			</form>

			<table className=" w-full max-w-[800px] border-separate border-spacing-y-2">
				<thead>
					<tr className="h-10 backdrop:blur-md rounded-lg font-semibold">
						<th className="font-semibold w-[5%]">#</th>
						<th className="font-semibold w-[10%]">Status</th>
						<th className="font-semibold w-[50%]">Title</th>
						<th className="font-semibold w-[15%]">Acceptance</th>
						<th className="font-semibold w-[20%]">Difficulty</th>
					</tr>
				</thead>

				<tbody>
					{problemStore.problems.map((problem, index) => {
						return (
							<tr
								key={index}
								className="h-10 backdrop:blur-md bg-lightTableRow1 dark:bg-darkTableRow1 rounded-lg cursor-pointer"
								onClick={() => navigate(`/solve-problem/${problem.id}`)}
							>
								<td className="rounded-l-lg text-center">{problem.problemNumber}</td>
								<td className="text-center">✓</td>
								<td>{problem.title}</td>
								<td className="text-center">{problem.acceptanceRate}</td>
								<td className="rounded-r-lg text-center text-green-500">{problem.difficulty}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
