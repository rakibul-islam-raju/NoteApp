import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function Login() {
	return (
		<div className="w-full md:w-4/12 bg-slate-100 shadow-xl p-4 rounded-lg">
			<h4 className="section-title mb-4 text-center">Login</h4>
			<LoginForm />
			<p className="mt-3 text-center">
				Need an account?{" "}
				<Link to="/register" className="link">
					Register here
				</Link>
			</p>
		</div>
	);
}
