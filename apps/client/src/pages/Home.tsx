import { useEffect } from "react";
import { AuthStore } from "../stores/authStore";
import { DefaultPage } from "../components/wrappers/default-page";

export default function Home() {
	const authStore = AuthStore();

	useEffect(() => {
		authStore.fetchUserProfile();
	}, []);

	return (
		<DefaultPage>
			<div className="w-full flex items-center justify-center gap-3 border-red-500">
				{authStore.userProfile && (
					<div className="flex flex-col gap-3">
						<div>Email : {authStore.userProfile.email}</div>
						<div>UserName : {authStore.userProfile.userName}</div>
						<button
							className="border border-black"
							type="button"
							disabled={authStore.skeletonLoading}
							onClick={() => authStore.signoutUser()}
						>
							{authStore.skeletonLoading ? "Signing out..." : "Sign out"}
						</button>
					</div>
				)}

				{authStore.skeletonLoading && !authStore.userProfile && <div> Loading... </div>}
			</div>
		</DefaultPage>
	);
}
