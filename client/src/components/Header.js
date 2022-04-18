import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="bg-slate-900 text-white py-3 fixed w-full shadow">
			<div className="wrapper flex flex-wrap justify-between items-center">
				<div className="text-3xl text-pink-600 font-semibold">
					Notes
				</div>
				<nav>
					<ul className="flex flex-wrap items-center justify-between space-x-3">
						<li>
							<Link className="nav-link" to="/">
								Create Note
							</Link>
						</li>
						<li>
							<Link className="nav-link" to="/">
								Notes
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
