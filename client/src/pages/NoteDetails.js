import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import noteService from "../service/note.service";
import categoryService from "../service/category.service";
import tagService from "../service/tag.service";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearMessage } from "../redux/slices/message";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const NoteSchema = yup.object().shape({
	category: yup.string().required(),
	tag: yup.string().required(),
	title: yup.string().min(6).max(50).required(),
	body: yup.string().min(50).required(),
});

export default function NoteDetails() {
	const { noteId } = useParams();
	const dispatch = useDispatch();

	const [note, setNote] = useState(null);
	const [tags, setTags] = useState([]);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(NoteSchema),
	});

	const updateHandler = (data) => {
		setLoading(true);
		console.log(data);
	};

	console.log("note =>", note);

	useEffect(() => {
		reset({ ...note });
	}, [note, reset]);

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
		tagService
			.getTags()
			.then((res) => setTags(res.data))
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
					<form
						onSubmit={handleSubmit(updateHandler)}
						className="w-full md:w-6/12 px-3"
					>
						<div className="flex space-x-3">
							<div className="mb-3">
								<label className="form-tag" htmlFor="category">
									Category
								</label>
								<select
									className="form-input"
									{...register("category")}
								>
									{categories?.map((cat) => (
										<option key={cat?._id} value={cat?._id}>
											{cat?.name}
										</option>
									))}
								</select>
								<p className="form-error">
									{errors.category?.message}
								</p>
							</div>
							<div className="mb-3">
								<label className="form-tag" htmlFor="tag">
									Tag
								</label>
								<select
									className="form-input"
									{...register("tag")}
								>
									{tags?.map((tag) => (
										<option key={tag?._id} value={tag?._id}>
											{tag?.name}
										</option>
									))}
								</select>
								<p className="form-error">
									{errors.tag?.message}
								</p>
							</div>
						</div>
						<div className="mb-3">
							<label className="form-label" htmlFor="title">
								Title
							</label>
							<input
								{...register("title")}
								type="text"
								className="form-input"
							/>
							<p className="form-error">
								{errors.title?.message}
							</p>
						</div>
						<div className="mb-3">
							<label className="form-label" htmlFor="body">
								Body
							</label>
							<textarea
								{...register("body")}
								name="body"
								id="body"
								rows="10"
								className="form-input"
							></textarea>
							<p className="form-error">{errors.body?.message}</p>
						</div>
						<button type="submit" className="btn w-full">
							Update Note
						</button>
					</form>

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
