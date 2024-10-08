import { CiSearch } from "react-icons/ci";

export default function ProblemSearchBox() {
    return (
        <div className="ProblemSearchBox relative h-fit">
            <div className="icon absolute top-1/2 left-3 transform -translate-y-1/2">
                <CiSearch />
            </div>
            <input
                className="searchBox border-2 border-light300 dark:border-dark300 bg-transparent py-1.5 pl-10 pr-5 rounded-[100vh]"
                placeholder="Search"
            ></input>
        </div>
    );
}
