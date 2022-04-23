import * as yup from "yup";

const NoteSchema = yup.object().shape({
	category: yup.string().required(),
	tag: yup.string().required(),
	title: yup.string().min(6).max(50).required(),
	body: yup.string().min(50).required(),
});

export default NoteSchema;
