import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import noteService from "../service/note.service";
import categoryService from "../service/category.service";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearMessage } from "../redux/slices/message";
import NoteUpdateForm from "../components/forms/NoteUpdateForm";

export default function NoteDetails() {
	const { noteId } = useParams();
	const dispatch = useDispatch();

	const [note, setNote] = useState(null);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		noteService
			.getNoteDetail(noteId)
			.then((res) => {
				setNote(res.data);
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	}, [noteId]);

	useEffect(() => {
		categoryService
			.getCategories()
			.then((res) => setCategories(res.data))
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	return (
		<section className="">
			{error && <Message text={error} color="pink" />}

			{loading ? (
				<Loader />
			) : (
				<div className="flex flex-wrap justify-between">
					<NoteUpdateForm
						categories={categories}
						note={note}
						setNote={setNote}
						setError={setError}
					/>

					<article className="w-full md:w-6/12 px-3 prose lg:prose-xl prose-img:rounded-lg prose-headings:text-pink-600 prose-heading:font-semibold prose-a:text-pink-600  bg-slate-100 p-4 rounded">
						<h4 className="text-2xl font-semibold">
							{note?.title}
						</h4>
						<ReactMarkdown
							children={note?.body}
							remarkPlugins={[remarkGfm]}
						/>
					</article>
				</div>
			)}
		</section>
	);
}
