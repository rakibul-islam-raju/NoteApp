import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import categoryService from "../service/category.service";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { clearMessage } from "../redux/slices/message";

export default function CategoryList({ setSelectCategory }) {
	const [categories, setCategories] = useState([]);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const deleteHandler = (categoryId) => {
		setLoading(true);
		categoryService
			.deleteCategory(categoryId)
			.then((res) => {
				if (res.status === 203) {
					window.alert("Category Deleted");
					setDeleteSuccess(true);
					navigate("/");
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

	useEffect(() => {
		categoryService
			.getCategories()
			.then((res) => {
				setCategories(res.data);
				setDeleteSuccess(false);
			})
			.catch((err) => {
				const errorMsg =
					(err.response && err.response.data.message) ||
					err.message ||
					err.toString();
				setError(errorMsg);
			})
			.finally(() => setLoading(false));
	}, [deleteSuccess]);

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

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
						<li
							key={category?._id}
							className="mt-2 flex items-center group"
						>
							<button
								className="note-list"
								onClick={() => setSelectCategory(category?._id)}
							>
								{category?.name}
							</button>

							<button
								type="button"
								className="bg-pink-600 text-white rounded-full p-1 ml-2 hidden group-hover:block transition ease-linear"
								onClick={() => deleteHandler(category?._id)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
