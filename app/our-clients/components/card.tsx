export default function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="break-inside-avoid bg-[#fff]  border border-gray-100 p-6">
      <h2 className="text-base md:text-xl lg:text-2xl font-semibold text-gray-500 lg:mb-4 text-center max-w-[90%]">
        {title}
      </h2>

      <div
        className="ProseMirror max-w-none"
        dangerouslySetInnerHTML={{
          __html: description.replaceAll("<p></p>", "\n"),
        }}
      />
    </div>
  );
}
