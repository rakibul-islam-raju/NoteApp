import { useState } from "react";
import { useNavigate } from "react-router-dom";
import noteService from "../../service/note.service";
import Loader from "../Loader";

export default function NoteForm({
	categories,
	note,
	setNote,
	setError,
	update,
}) {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const changeHandler = (e) => {
		const value = e.target.value;
		setNote({ ...note, [e.target.name]: value });
	};

	const updateHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		noteService
			.patchNote(note, note._id)
			.then((res) => {
				if (res.data?._id) {
					window.alert("Note Updated!");
				}
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	};

	const createHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		noteService
			.postNote(note)
			.then((res) => {
				if (res.data?._id) {
					window.alert("Note Created!");
					navigate("/");
				}
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	};

	const deleteHandler = (e) => {
		setLoading(true);
		noteService
			.deleteNote(note?._id)
			.then((res) => {
				if (res.status === 203) {
					window.alert("Note Deleted");
					navigate("/");
				}
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	};

	return (
		<form
			onSubmit={(e) => {
				update ? updateHandler(e) : createHandler(e);
			}}
			className="w-full md:w-6/12 px-3"
		>
			<div className="mb-3">
				<label className="form-tag" htmlFor="category">
					Category
				</label>
				<select
					onChange={changeHandler}
					className="form-input"
					name="category"
					id="category"
					value={note?.category}
				>
					<option value="">Select Category</option>
					{categories?.map((cat) => (
						<option key={cat?._id} value={cat?._id}>
							{cat?.name}
						</option>
					))}
				</select>
			</div>
			<div className="mb-3">
				<label className="form-label" htmlFor="title">
					Title
				</label>
				<input
					onChange={changeHandler}
					defaultValue={note?.title}
					name="title"
					id="title"
					type="text"
					className="form-input"
					required
					minLength={6}
					maxLength={50}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label" htmlFor="body">
					Body
				</label>
				<textarea
					onChange={changeHandler}
					defaultValue={note?.body}
					name="body"
					id="body"
					rows="10"
					className="form-input"
					required
					minLength={50}
				></textarea>
			</div>

			{loading ? (
				<Loader />
			) : (
				<>
					<button type="submit" className="btn w-full">
						Save
					</button>
					{update && (
						<button
							onClick={deleteHandler}
							type="button"
							className="text-white w-full mt-3 font-semibold text-lg px-3 py-1 rounded-lg shadow bg-pink-600 transition ease-linear"
						>
							Delete Note
						</button>
					)}
				</>
			)}
		</form>
	);
}
