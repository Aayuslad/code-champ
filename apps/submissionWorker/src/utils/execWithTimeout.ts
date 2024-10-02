import { spawn } from "child_process";

export async function execWithTimeout(
    command: string,
    containerId: string,
    languageId: number,
    timeout = 1000,
): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(command, { shell: true });

        let stdout = "";
        let stderr = "";
        let timedOut = false;

        childProcess.stdout.on("data", data => {
            stdout += data.toString();
        });

        childProcess.stderr.on("data", data => {
            stderr += data.toString();
        });

        childProcess.on("close", code => {
            if (timedOut) return;
            clearTimeout(timer);
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}`));
            } else {
                resolve({ stdout, stderr });
            }
        });

        // Set a timeout to kill the process if it runs longer than the specified time
        const timer = setTimeout(() => {
            timedOut = true;
 
            const killProcess = spawn(`docker exec ${containerId} pkill -f ${languageId === 3 ? "java" : "myapp"}`, {
                shell: true,
            });

            killProcess.on("close", () => {
                reject(new Error("time limit exceeded"));
            });
        }, timeout);

        childProcess.on("exit", () => {
            if (timedOut) return;
            clearTimeout(timer);
        });
    });
}
