import { useState, useEffect } from "react";
import noteService from "../service/note.service";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function NoteList() {
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		noteService
			.getNotes()
			.then((res) => {
				setNotes(res.data);
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
			<h4 className="dashboard-title">All Notes</h4>

			{error && <Message text={error} color="pink" />}

			<div className="">
				{loading ? (
					<Loader />
				) : (
					notes.map((note) => (
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
