interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div
      className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold prose-headings:text-slate-900
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-slate-600 prose-p:leading-relaxed prose-p:break-words
        prose-a:text-[#5b21b6] prose-a:no-underline hover:prose-a:underline prose-a:break-words
        prose-strong:text-slate-900
        prose-ul:my-6 prose-li:my-1 prose-li:text-slate-600 [&_li>p]:my-0
        prose-ol:my-6
        prose-blockquote:border-l-[#5b21b6] prose-blockquote:text-slate-600 prose-blockquote:italic
        prose-code:text-[#5b21b6] prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-code:break-words
        prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:overflow-x-auto
        prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full
        [&_pre]:max-w-full [&_pre_code]:break-normal"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
