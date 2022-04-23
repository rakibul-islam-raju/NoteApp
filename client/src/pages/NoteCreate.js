import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import categoryService from "../service/category.service";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearMessage } from "../redux/slices/message";
import NoteForm from "../components/forms/NoteForm";
import NoteArticle from "../components/NoteArticle";

export default function NoteCreate() {
	const dispatch = useDispatch();

	const [note, setNote] = useState(null);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
					<NoteForm
						categories={categories}
						note={note}
						setNote={setNote}
						setError={setError}
						update={false}
					/>

					<NoteArticle note={note} />
				</div>
			)}
		</section>
	);
}
