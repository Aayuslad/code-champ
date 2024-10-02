import { redisClient } from "../database/redisClient";

export const updateBatchResult = async (id: string, status: string, tasks: any[] = [], compilationError: string = ""): Promise<void> => {
    const key = `batchResult:${id}`;
    const result = { status, tasks, compilationError };

    if (tasks.length === 0) {
        const existingResult = await redisClient.get(key);
        if (existingResult) {
            const parsedResult = JSON.parse(existingResult);
            result.tasks = parsedResult.tasks || [];
        }
    }

    await redisClient.set(key, JSON.stringify(result));
};
