import CategoryList from "../components/CategoryList";
import NoteList from "../components/NoteList";
import TagList from "../components/TagList";

export default function Dashboard() {
	return (
		<section className="flex flex-wrap justify-between">
			<div className="w-full md:w-6/12 lg:w-10/12">
				<NoteList />
			</div>
			<div className="w-full md:w-6/12 lg:w-2/12">
				<CategoryList />

				<hr className="my-6" />

				<TagList />
			</div>
		</section>
	);
}
