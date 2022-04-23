import { useState } from "react";
import CategoryList from "../components/CategoryList";
import NoteList from "../components/NoteList";

export default function Dashboard() {
	const [selectCategory, setSelectCategory] = useState(null);

	return (
		<section className="flex flex-wrap justify-between">
			<div className="w-full md:w-6/12 lg:w-10/12">
				<NoteList selectCategory={selectCategory} />
			</div>
			<div className="w-full md:w-6/12 lg:w-2/12">
				<CategoryList setSelectCategory={setSelectCategory} />

				{/* <TagList /> */}
			</div>
		</section>
	);
}
