import HeaderBg from "@/public/images/header-bg.png";

export default function Header({ title }: { title: string }) {
  return (
    <div
      className="relative bg-cover py-5 md:py-10 lg:py-20"
      style={{
        backgroundImage: `url(${HeaderBg.src})`,
        backgroundPosition: "30% 20%",
        backgroundSize: "130%",
      }}
    >
      <div className="absolute inset-0 bg-blue opacity-60"></div>
      <div className="flex relative z-10 flex-col justify-center items-center py-10 text-sm text-white md:gap-2 md:py-20 md:text-base">
        <h1 className="text-2xl font-bold text-center md:text-5xl">{title}</h1>
      </div>
    </div>
  );
}
