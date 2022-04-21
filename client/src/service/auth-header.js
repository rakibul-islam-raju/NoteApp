export default function authHeader() {
	const token = JSON.parse(localStorage.getItem("notesUser"));
	if (token) {
		return { Authorization: `Bearer ${token}` };
		// return { "x-access-token": user.token };
	} else {
		return {};
	}
}
