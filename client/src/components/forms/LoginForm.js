import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import LoginSchema from "../../schemas/LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/auth";

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate;

	const { message } = useSelector((state) => state.message);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(LoginSchema),
	});

	const dispatch = useDispatch();

	const loginHandler = (data) => {
		const { email, password } = data;
		setLoading(true);
		dispatch(login({ email, password }))
			.unwrap()
			.then(() => {
				navigate("/");
				// window.location.reload();
			})
			.catch(() => {
				setLoading(false);
			});

		// reset();
	};

	return (
		<form onSubmit={handleSubmit(loginHandler)}>
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

			<button type="submit" className="btn w-full mt-4">
				Sign In
			</button>
		</form>
	);
}
