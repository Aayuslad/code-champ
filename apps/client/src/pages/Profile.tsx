import { useEffect } from "react";
import { AuthStore } from "../stores/authStore";
import { Header } from "../components/headers/hader";
import MainWrapper from "../components/wrappers/mainWrapper";
import { SideNavbar } from "../components/navbars/sideNavbar";

export default function Profile() {
	const authStore = AuthStore();

	useEffect(() => {
		authStore.fetchUserProfile();
	}, []);

	return (
		<div className="Home Page">
			<SideNavbar />

			<MainWrapper>
				<Header />

				<div className="flex items-center justify-center gap-3 border-red-500">
					{authStore.userProfile && (
						<div className="flex flex-col gap-3">
							<div>Email : {authStore.userProfile.email}</div>
							<div>UserName : {authStore.userProfile.userName}</div>
							<button
								className="rounded-lg bg-buttonBlue text-center text-lg text-white py-1.5"
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
			</MainWrapper>
		</div>
	);
}
