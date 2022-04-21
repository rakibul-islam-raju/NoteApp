export default function authHeader() {
	const user = JSON.parse(localStorage.getItem("notesUser"));
	if (user && user.token) {
		return { "x-access-token": user.token };
	} else {
		return {};
	}
}
