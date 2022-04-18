import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RegisterSchema from "../../schemas/RegisterSchema";

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(RegisterSchema),
	});

	const registerHandler = (data) => {
		console.log({ data });
		reset();
	};

	return (
		<form onSubmit={handleSubmit(registerHandler)}>
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

			<button type="submit" className="btn w-full mt-4">
				Register Now
			</button>
		</form>
	);
}
