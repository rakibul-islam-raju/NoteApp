import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Login, Register, NotFound } from "./pages";
import { AuthContainer } from "./containers";
import "./App.css";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="" element={<AuthContainer />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				<Route index element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}
