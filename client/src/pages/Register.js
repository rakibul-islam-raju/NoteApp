import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

export default function Register() {
	return (
		<div className="w-full md:w-4/12 mx-auto bg-slate-100 shadow-md mt-6 p-4">
			<h4 className="section-title mb-4 text-center">
				Create New Account
			</h4>

			<RegisterForm />

			<p className="mt-3 text-center">
				Already have an account?{" "}
				<Link to="/login" className="link">
					Login here
				</Link>
			</p>
		</div>
	);
}
