import { useState, useEffect } from "react";
import noteService from "../service/note.service";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function NoteList({ selectCategory }) {
	const [notes, setNotes] = useState([]);
	const [filteredNotes, setFilteredNotes] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (selectCategory) {
			const fNotes = notes.filter(
				(item) => item.category === selectCategory
			);
			setFilteredNotes(fNotes);
		}

		if (selectCategory === "uncategorized") {
			console.log("selectCategory");
			const fNotes = notes.filter(
				(item) => item.category === ("" || undefined)
			);
			setFilteredNotes(fNotes);
		}

		if (selectCategory === "all") {
			setFilteredNotes(notes);
		}
	}, [selectCategory, notes]);

	useEffect(() => {
		noteService
			.getNotes()
			.then((res) => {
				setNotes(res.data);
				setFilteredNotes(res.data);
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<>
			<div className="flex items-center space-x-5">
				<h4 className="dashboard-title">All Notes</h4>
				<Link
					to="/note/new/"
					className="rounded-full bg-slate-700 text-white mb-3 hover:bg-pink-600 hover:text-white transition ease-linear"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						/>
					</svg>
				</Link>
			</div>

			{error && <Message text={error} color="pink" />}

			<div className="">
				{loading ? (
					<Loader />
				) : (
					filteredNotes.map((note) => (
						<Link
							key={note?._id}
							className="note-list"
							to={`note/${note?._id}`}
						>
							{note?.title}
						</Link>
					))
				)}
			</div>
		</>
	);
}
