import CategoryList from "../components/CategoryList";
import NoteList from "../components/NoteList";

export default function Dashboard() {
	return (
		<section className="flex flex-wrap justify-between">
			<div className="w-full md:w-6/12 lg:w-10/12">
				<NoteList />
			</div>
			<div className="w-full md:w-6/12 lg:w-2/12">
				<CategoryList />

				{/* <TagList /> */}
			</div>
		</section>
	);
}
