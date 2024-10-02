import axios from "axios";

export const sendCallback = async (callbackUrl: string, submissionId: string, accepted: boolean) => {
    try {
        await axios.post(callbackUrl, { submissionId, accepted });
    } catch (error) {
        console.error("Error sending callback:", error);
    }
};
