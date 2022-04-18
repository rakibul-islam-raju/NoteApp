import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginSchema from "../../schemas/LoginSchema";

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(LoginSchema),
	});

	const loginHandler = (data) => {
		console.log({ data });
		reset();
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
