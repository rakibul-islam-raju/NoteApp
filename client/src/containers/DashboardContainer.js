import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function DashboardContainer() {
	return (
		<>
			<Header />
			<main className="wrapper pt-16 text-slate-700 h-screen bg-slate-800">
				<Outlet />
			</main>
		</>
	);
}
