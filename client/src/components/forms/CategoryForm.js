import { useState, useEffect } from "react";
import { clearMessage } from "../../redux/slices/message";
import { useSelector, useDispatch } from "react-redux";
import categoryService from "../../service/category.service";
import Message from "../Message";
import Loader from "../Loader";

export default function CategoryForm({
	setShowModal,
	setCategoryCreateSuccess,
}) {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(null);
	const [error, setError] = useState(null);

	const dispatch = useDispatch();

	const { message } = useSelector((state) => state.message);

	const createHandler = (e) => {
		e.preventDefault();
		setLoading(true);
		categoryService
			.postCategory({ name: name })
			.then((res) => {
				if (res.data?._id) {
					setCategoryCreateSuccess(true);
					setShowModal(false);
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
		dispatch(clearMessage());
	}, [dispatch]);

	return (
		<div class="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
			<div class="bg-slate-100 px-8 py-8 rounded-md w-5/12">
				<form onSubmit={createHandler}>
					<h4 className="dashboard-title">Create New Category</h4>

					{message && <Message color="pink" text={message} />}
					{error && <Message color="pink" text={error} />}

					<div className="mb-6">
						<label className="form-label text-left" htmlFor="name">
							Name
						</label>
						<input
							value={name}
							onChange={(e) => setName(e.target.value)}
							name="name"
							id="name"
							type="text"
							className="form-input"
						/>
					</div>

					{loading ? (
						<Loader />
					) : (
						<>
							<button
								onClick={() => setShowModal(false)}
								class="bg-pink-600 px-4 py-2 rounded-md text-md text-white"
							>
								Cancle
							</button>
							<button
								type="submit"
								class="bg-slate-700 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
							>
								Save
							</button>
						</>
					)}
				</form>
			</div>
		</div>
	);
}
