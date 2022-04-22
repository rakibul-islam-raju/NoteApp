import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../../schemas/LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";
import Message from "../Message";
import Loader from "../Loader";
import { clearMessage } from "../../redux/slices/message";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { message } = useSelector((state) => state.message);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(LoginSchema),
	});

	const loginHandler = (data) => {
		const { email, password } = data;
		setLoading(true);
		dispatch(login({ email, password }))
			.unwrap()
			.then(() => {
				reset();
				navigate("/");
			})
			.catch(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	return (
		<form onSubmit={handleSubmit(loginHandler)}>
			{message && <Message color="pink" text={message} />}

			<div className="mb-2">
				<label className="form-label" htmlFor="email">
					Email Address
				</label>
				<input
					className="form-input"
					type="email"
					name="email"
					id="email"
					{...register("email")}
				/>
				<p className="form-error">{errors.email?.message}</p>
			</div>
			<div className="mb-2">
				<label className="form-label" htmlFor="password">
					Password
				</label>
				<input
					className="form-input"
					type="password"
					name="password"
					id="password"
					{...register("password")}
				/>
				<p className="form-error">{errors.password?.message}</p>
			</div>

			{loading ? (
				<Loader />
			) : (
				<button type="submit" className="btn w-full mt-4">
					Sign In
				</button>
			)}
		</form>
	);
}
