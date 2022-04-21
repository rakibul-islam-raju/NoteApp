import { useEffect, useState } from "react";
import categoryService from "../service/category.service";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function CategoryList() {
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		categoryService
			.getCategories()
			.then((res) => {
				setCategories(res.data);
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
			<h4 className="dashboard-title">Categories</h4>

			{error && <Message text={error} color="pink" />}

			{loading ? (
				<Loader />
			) : (
				<ul>
					{categories?.map((category) => (
						<li key={category?._id} className="">
							<Link className="note-list" to="/">
								{category?.name}
							</Link>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
