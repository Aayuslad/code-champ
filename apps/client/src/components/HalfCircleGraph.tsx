import { UiStore } from "../stores/uiStore";

type Props = {
    data: { value: number; color: string; total: number }[];
    total: number;
    solved: number;
};

export const HalfCircleGraph = ({ data, total, solved }: Props) => {
    const uiStore = UiStore();
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const fourtHhalfCircumference = circumference / 4 - 5;
    const strokeWidth = 3;

    return (
        <div className="relative flex justify-center items-center w-52 h-52 overflow-visible">
            <svg width="100%" height="100%" viewBox="0 0 120 120" className="rotate-180 overflow-visible">
                {data.map((section, index) => {
                    const multiplier = section.value / section.total;

                    return (
                        <>
                            <circle
                                key={index}
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="transparent"
                                stroke={`${uiStore.theme === "dark" ? `${section.color}20` : `${section.color}40`}`}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${fourtHhalfCircumference} ${circumference - fourtHhalfCircumference}`}
                                strokeDashoffset="0"
                                transform={`rotate(${index * 90 - 90}, 60, 60)`}
                            />
                            <circle
                                key={index}
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="transparent"
                                stroke={`${section.color}`}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${fourtHhalfCircumference * multiplier} ${circumference - fourtHhalfCircumference * multiplier}`}
                                strokeDashoffset="0"
                                transform={`rotate(${index * 90 - 90}, 60, 60)`}
                            />
                        </>
                    );
                })}
            </svg>

            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold text-black dark:text-white">
                    <span>{solved}</span>/<span className="text-2xl">{total}</span>
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 font-semibold">Solved</p>
            </div>
        </div>
    );
};
