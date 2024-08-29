import { GiDiceFire } from "react-icons/gi";

export function RandomProblemButton() {
	return (
		<button type="button" className="flex ml-auto gap-2 items-center text-green-600">
			<div className="text-3xl text-green-600">
				<GiDiceFire />
			</div>
			Random
		</button>
	);
}
