import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";

export default function Header() {
	const dispatch = useDispatch();

	const { user, isLoggedIn } = useSelector((state) => state.auth);

	return (
		<header className="bg-slate-900 text-white py-3 fixed w-full shadow">
			<div className="wrapper flex flex-wrap justify-between items-center">
				<div className="text-3xl text-pink-600 font-semibold">
					Notes
				</div>
				<nav>
					<ul className="flex flex-wrap items-center justify-between space-x-3">
						{/* <li>
							<Link className="nav-link" to="/">
								Create Note
							</Link>
						</li>
						<li>
							<Link className="nav-link" to="/">
								Notes
							</Link>
						</li> */}
						<li>
							<button
								type="button"
								onClick={() => dispatch(logout())}
								className="nav-link"
							>
								Logout
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
