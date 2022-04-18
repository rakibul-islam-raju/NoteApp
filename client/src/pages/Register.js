import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
	const [loginData, setLoginData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const value = e.target.value;
		setLoginData({
			...loginData,
			[e.target.name]: value,
		});
	};

	const loginHandler = (e) => {
		e.preventDefault();
		console.log(loginData);
	};

	return (
		<section className="wrapper">
			<div className="w-full md:w-4/12 mx-auto bg-slate-100 shadow-md mt-6 p-4">
				<h4 className="section-title mb-4 text-center">
					Create New Account
				</h4>
				<form onSubmit={loginHandler}>
					<div className="mb-2">
						<label className="form-label" htmlFor="name">
							Full Name
						</label>
						<input
							className="form-input"
							type="text"
							name="name"
							id="name"
							required
							value={loginData?.name}
							onChange={handleChange}
						/>
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
							required
							value={loginData?.email}
							onChange={handleChange}
						/>
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
							required
							value={loginData?.password}
							onChange={handleChange}
						/>
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
							required
						/>
					</div>

					<button type="submit" className="btn w-full mt-4">
						Register Now
					</button>
				</form>

				<p className="mt-3 text-center">
					Already have an account?{" "}
					<Link to="/login" className="link">
						Login here
					</Link>
				</p>
			</div>
		</section>
	);
}
