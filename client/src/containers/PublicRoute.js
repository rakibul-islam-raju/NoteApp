import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
	const { isLoggedIn } = useSelector((state) => state.auth);

	return isLoggedIn ? <Navigate to="/" replace /> : children;
}
