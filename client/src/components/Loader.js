import { loading } from "../assets/images";

export default function Loader() {
	return (
		<div className="flex justify-center my-2">
			<img className="w-12 h-12" src={loading} alt="Loading..." />
		</div>
	);
}
