import React from "react";
import { Link } from "react-router-dom";

export default function CategoryList() {
	return (
		<>
			<h4 className="dashboard-title">Categories</h4>
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
