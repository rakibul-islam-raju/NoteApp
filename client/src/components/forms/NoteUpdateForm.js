import { useState, useEffect } from "react";
import noteService from "../../service/note.service";
import Loader from "../Loader";
import Message from "../Message";

export default function NoteUpdateForm({
	categories,
	note,
	setNote,
	setError,
}) {
	const [loading, setLoading] = useState(false);

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

	return (
		<form onSubmit={updateHandler} className="w-full md:w-6/12 px-3">
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
					required
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
				<button type="submit" className="btn w-full">
					Update Note
				</button>
			)}
		</form>
	);
}
