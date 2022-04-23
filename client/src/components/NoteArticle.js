import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function NoteArticle({ note }) {
	return (
		<article className="w-full md:w-6/12 px-3 prose lg:prose-xl prose-img:rounded-lg prose-headings:text-pink-600 prose-heading:font-semibold prose-a:text-pink-600  bg-slate-100 p-4 rounded">
			<h4 className="text-2xl font-semibold">{note?.title}</h4>
			<ReactMarkdown children={note?.body} remarkPlugins={[remarkGfm]} />
		</article>
	);
}
