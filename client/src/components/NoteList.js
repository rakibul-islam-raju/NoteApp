import React from "react";
import { Link } from "react-router-dom";

const notes = [
	{
		_id: 1,
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
	},
	{
		_id: 2,
		title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
	},
];

export default function NoteList() {
	return (
		<>
			<h4 className="dashboard-title">All Notes</h4>

			<div className="">
				{notes.map((note) => (
					<Link
						key={note?._id}
						className="note-list"
						to={`note/${note?._id}`}
					>
						{note?.title}
					</Link>
				))}
			</div>
		</>
	);
}
