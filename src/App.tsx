import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	useNavigate,
	Routes,
	Route,
} from "react-router-dom";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	SignIn,
	SignUp,
	UserButton,
} from "@clerk/clerk-react";

import Home from "./pages/home";
import LogIn from "./pages/sign-in";
import Gallery from "./pages/gallery";
import "./App.css";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error("MIssing Publishable Key");
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
	const navigate = useNavigate();

	return (
		<ClerkProvider
			signInUrl="/signin/*"
			navigate={(to) => {console.log(to) ;navigate(to)}}
			publishableKey={clerkPubKey}
		>
			<Routes>
				<Route
					path="/"
					element={
						<>
						<SignedIn>
							<Home />
							<Gallery />
						</SignedIn>
						<SignedOut>
        <RedirectToSignIn />
      </SignedOut>
						</>
					}
				/>
				<Route
					path="/signin/*"
					element={<LogIn/>}
				/>
			</Routes>
		</ClerkProvider>
	);
}

export default ClerkProviderWithRoutes;
