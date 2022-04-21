import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://127.0.0.1:8000/api/v1/tags";

const getTags = () => {
	return axios.get(API_URL, { headers: authHeader() });
};

const postTag = (noteData) => {
	return axios.post(API_URL, noteData, { headers: authHeader() });
};

const getTagDetail = (noteId) => {
	return axios.get(API_URL + noteId, { headers: authHeader() });
};

const patchTag = (noteData, noteId) => {
	return axios.patch(API_URL + noteId, noteData, { headers: authHeader() });
};

const deleteTag = (noteId) => {
	return axios.delete(API_URL + noteId, { headers: authHeader() });
};

const tagService = {
	getTags,
	postTag,
	getTagDetail,
	patchTag,
	deleteTag,
};
export default tagService;
