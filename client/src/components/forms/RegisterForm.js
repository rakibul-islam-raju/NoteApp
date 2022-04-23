import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import RegisterSchema from "../../schemas/RegisterSchema";
import { useDispatch, useSelector } from "react-redux";
import { register as registerSlice } from "../../redux/slices/auth";
import Message from "../Message";
import Loader from "../Loader";
import { clearMessage } from "../../redux/slices/message";

export default function RegisterForm() {
	const [loading, setLoading] = useState(false);
	const [successful, setSuccessful] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { message } = useSelector((state) => state.message);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(RegisterSchema),
	});

	const registerHandler = (data) => {
		const { name, email, password } = data;

		setSuccessful(false);
		setLoading(true);
		dispatch(registerSlice({ name, email, password }))
			.unwrap()
			.then((res) => {
				console.log("rrrrrrrrr");
				setSuccessful(true);
				reset();
			})
			.catch((err) => {
				console.log(err);
				setSuccessful(false);
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	return (
		<form onSubmit={handleSubmit(registerHandler)}>
			{message && <Message color="pink" text={message} />}
			{successful && (
				<Message
					color="pink"
					text={<Link to="/login">Please Login.</Link>}
				/>
			)}

			<div className="mb-2">
				<label className="form-label" htmlFor="name">
					Full Name
				</label>
				<input
					className="form-input"
					type="text"
					name="name"
					id="name"
					{...register("name")}
				/>
				<p className="form-error">{errors.name?.message}</p>
			</div>
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
			<div className="mb-2">
				<label className="form-label" htmlFor="confirmPassword">
					Confirm Password
				</label>
				<input
					className="form-input"
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					{...register("confirmPassword")}
				/>
				<p className="form-error">{errors.confirmPassword?.message}</p>
			</div>

			{loading ? (
				<Loader />
			) : (
				<button type="submit" className="btn w-full mt-4">
					Register Now
				</button>
			)}
		</form>
	);
}
