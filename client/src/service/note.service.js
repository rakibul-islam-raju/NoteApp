import axios from "axios";
import authHeader from "./auth-header";
const API_URL = process.env.REACT_APP_API_URL + "notes/";

const getNotes = () => {
	return axios.get(API_URL, { headers: authHeader() });
};

const postNote = (noteData) => {
	return axios.post(API_URL, noteData, { headers: authHeader() });
};

const getNoteDetail = (noteId) => {
	return axios.get(API_URL + noteId, { headers: authHeader() });
};

const patchNote = (noteData, noteId) => {
	return axios.patch(API_URL + noteId, noteData, { headers: authHeader() });
};

const deleteNote = (noteId) => {
	return axios.delete(API_URL + noteId, { headers: authHeader() });
};

const noteService = {
	getNotes,
	postNote,
	getNoteDetail,
	patchNote,
	deleteNote,
};
export default noteService;
