export default function Message({ color, text }) {
	return (
		<div
			className={`bg-${color}-100 text-${color}-600 rounded p-3 font-semibold`}
		>
			{text}
		</div>
	);
}
