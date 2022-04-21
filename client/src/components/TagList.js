import { useEffect, useState } from "react";
import tagService from "../service/tag.service";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function TagList() {
	const [tags, setTags] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		tagService
			.getTags()
			.then((res) => {
				setTags(res.data);
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
			<h4 className="dashboard-title">Tags</h4>

			{error && <Message text={error} color="pink" />}

			{loading ? (
				<Loader />
			) : (
				<ul>
					{tags?.map((tag) => (
						<li key={tag?._id} className="">
							<Link className="note-list" to="/">
								{tag?.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
