import { Outlet } from "react-router-dom";
import { image3 } from "../assets/images";

export default function AuthContainer() {
	return (
		<section className="wrapper">
			<div className="flex justify-between items-center">
				<div className="w-full md:w-8/12 h-screen">
					<img className="h-screen" src={image3} alt="" />
				</div>
				<Outlet />
			</div>
		</section>
	);
}
