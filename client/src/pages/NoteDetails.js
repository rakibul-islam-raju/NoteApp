import { useParams } from "react-router-dom";

export default function NoteDetails() {
	const { noteId } = useParams();

	return (
		<section>
			<div className="">note id = {noteId}</div>
		</section>
	);
}
