type NotFoundProps = {
  title?: string;
  description?: string;
};
export default function NotFoundSign({ title, description }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-6xl font-bold text-center leading-[120%]">404!</h1>
      <p className="text-center text-gray-800 text-xl">
        {description || "The page you are looking for does not exist."}
      </p>
    </div>
  );
}
