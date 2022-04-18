import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Register, NoteDetails, NotFound } from "./pages";
import { AuthContainer, DashboardContainer } from "./containers";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />

				{/* auth routes */}
				<Route path="" element={<AuthContainer />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				{/* dashboard routes */}
				<Route path="" element={<DashboardContainer />}>
					<Route index element={<Dashboard />} />
					<Route path="note/:noteId" element={<NoteDetails />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
