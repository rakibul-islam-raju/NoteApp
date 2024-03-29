import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "categories/";

const getCategories = () => {
	return axios.get(API_URL, { headers: authHeader() });
};

const postCategory = (data) => {
	return axios.post(API_URL, data, { headers: authHeader() });
};

const getCategoryDetail = (categoryId) => {
	return axios.get(API_URL + categoryId, { headers: authHeader() });
};

const patchCategory = (data, categoryId) => {
	return axios.patch(API_URL + categoryId, data, { headers: authHeader() });
};

const deleteCategory = (categoryId) => {
	return axios.delete(API_URL + categoryId, { headers: authHeader() });
};

const noteService = {
	getCategories,
	postCategory,
	getCategoryDetail,
	patchCategory,
	deleteCategory,
};
export default noteService;
