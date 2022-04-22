import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + "auth/";

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
