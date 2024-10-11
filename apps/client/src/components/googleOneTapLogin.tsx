import { useEffect } from "react";
import { AuthStore } from "../stores/authStore";

declare global {
    interface Window {
        google: {
            accounts: {
                id: {
                    initialize: (config: any) => void;
                    prompt: () => void;
                };
            };
        };
    }
}

const GoogleOneTapLogin = () => {
    const authStore = AuthStore();

    useEffect(() => {
        if (typeof window.google !== "undefined") {
            window.google.accounts.id.initialize({
                client_id: "487823489608-01ko2siujed4scfcjvi6gmbc5r8h1b9d.apps.googleusercontent.com",
                callback: authStore.handleGoogleOneTapResponse,
                scope: "openid email profile",
            });
            window.google.accounts.id.prompt(); // Shows the One-Tap prompt
        }
    }, []);

    return null; // No visible UI component needed
};

export default GoogleOneTapLogin;
