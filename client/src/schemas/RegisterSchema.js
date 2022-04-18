import * as yup from "yup";

const RegisterSchema = yup.object().shape({
	name: yup.string().min(4).max(15).required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default RegisterSchema;
