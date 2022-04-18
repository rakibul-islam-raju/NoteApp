import { Link } from "react-router-dom";

export default function TagList() {
	return (
		<>
			<h4 className="dashboard-title">Tags</h4>
			<ul>
				<li className="">
					<Link className="note-list" to="/">
						Lorem ipsum
					</Link>
				</li>
			</ul>
		</>
	);
}
