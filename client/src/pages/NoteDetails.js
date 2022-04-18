import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

export default function NoteDetails() {
	const { noteId } = useParams();

	return (
		<section className="">
			<article className="w-full md:w-10/12 mx-auto prose lg:prose-xl prose-img:rounded-lg prose-headings:text-pink-600 prose-heading:font-semibold prose-a:text-pink-600  bg-slate-200 p-4 rounded">
				<ReactMarkdown
					children={markdown}
					remarkPlugins={[remarkGfm]}
				/>
			</article>
		</section>
	);
}
