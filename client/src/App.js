import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Register, NoteDetails, NotFound } from "./pages";
import {
	AuthContainer,
	DashboardContainer,
	PrivateRoute,
	PublicRoute,
} from "./containers";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />

				{/* auth routes */}
				<Route
					path=""
					element={
						<PublicRoute>
							<AuthContainer />
						</PublicRoute>
					}
				>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				{/* dashboard routes */}
				<Route
					path=""
					element={
						<PrivateRoute>
							<DashboardContainer />
						</PrivateRoute>
					}
				>
					<Route index element={<Dashboard />} />
					<Route path="note/:noteId" element={<NoteDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
