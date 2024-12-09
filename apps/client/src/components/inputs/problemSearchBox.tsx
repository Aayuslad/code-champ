import { CiSearch } from "react-icons/ci";

type Props = {
    searchKey?: string;
    setSearchKey?: (searchKey: string) => void;
    width?: string;
};

export default function ProblemSearchBox({ searchKey, setSearchKey, width }: Props) {
    return (
        <div className="ProblemSearchBox relative h-fit">
            <div className="icon absolute top-1/2 left-3 transform -translate-y-1/2">
                <CiSearch />
            </div>
            <input
                className={`w-[${width ? width : "auto"}] searchBox border-2 border-light300 dark:border-dark300 bg-transparent py-1.5 pl-10 pr-5 rounded-[100vh]`}
                placeholder="Search problems..."
                value={searchKey}
                onChange={e => {
                    setSearchKey?.(e.target.value);
                }}
            ></input>
        </div>
    );
}
