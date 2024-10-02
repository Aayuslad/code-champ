export const extractError = (log: string) => {
    const lines = log.split("\n");

    const errorMessage = lines
        .filter(line => line.includes("error:"))
        .map(line => line.split("error:")[1].trim())
        .join("\n");

    return errorMessage;
};
