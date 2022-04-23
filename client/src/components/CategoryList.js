import { useEffect, useState } from "react";
import categoryService from "../service/category.service";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";

export default function CategoryList({ setSelectCategory }) {
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
					<li className="">
						<button
							className="note-list"
							onClick={() => setSelectCategory("all")}
						>
							All Notes
						</button>
					</li>
					<li className="">
						<button
							className="note-list"
							onClick={() => setSelectCategory("uncategorized")}
						>
							Uncategorized
						</button>
					</li>
					<hr />
					{categories?.map((category) => (
						<li key={category?._id} className="mt-2">
							<button
								className="note-list"
								onClick={() => setSelectCategory(category?._id)}
							>
								{category?.name}
							</button>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
