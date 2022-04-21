import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/v1/auth/";

const register = (name, email, password) => {
	return axios.post(API_URL + "register", {
		name,
		email,
		password,
	});
};

const login = (email, password) => {
	return axios
		.post(API_URL + "login", {
			email,
			password,
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem(
					"notesUser",
					JSON.stringify(response.data.token)
				);
			}
			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("notesUser");
};

const authService = {
	register,
	login,
	logout,
};
export default authService;
