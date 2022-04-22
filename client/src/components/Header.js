import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";

export default function Header() {
	const dispatch = useDispatch();

	const { isLoggedIn } = useSelector((state) => state.auth);

	return (
		<header className="bg-slate-800 text-white py-3 fixed w-full shadow">
			<div className="wrapper flex flex-wrap justify-between items-center">
				<Link to="/" className="text-3xl text-pink-600 font-semibold">
					Notes
				</Link>
				<nav>
					<ul className="flex flex-wrap items-center justify-between space-x-3">
						{isLoggedIn ? (
							<li>
								<button
									type="button"
									onClick={() => dispatch(logout())}
									className="nav-link"
								>
									Logout
								</button>
							</li>
						) : (
							<li>
								<Link to="/login" className="nav-link">
									Login
								</Link>
							</li>
						)}
					</ul>
				</nav>
			</div>
		</header>
	);
}
