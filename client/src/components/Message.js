export default function Message({ color, text }) {
	return (
		<div
			className={`bg-slate-300 text-${color}-600 rounded p-3 font-semibold my-3`}
		>
			{text}
		</div>
	);
}
