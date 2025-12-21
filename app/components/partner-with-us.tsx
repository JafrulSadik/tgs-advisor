import PartnerWithUsForm from "./partner-with-us-form";

export default function PartnerWithUs() {
  return (
    <div className="flex overflow-hidden flex-col gap-10 items-center w-full py-5 md:py-15 bg-body sm:bg-none md:bg-none lg:bg-no-repeat">
      <div className="flex w-fit items-center gap-2 rounded-full border-2 border-blue px-2 py-1 font-bold uppercase md:px-4 md:py-1">
        <p className="text-sm text-[#231F20] md:text-base">
          Partner With Us for Excellence
        </p>
      </div>

      <div className="py-4 px-5 md:px-12 bg-blue rounded-[14px] md:rounded-2xl w-[90%] mb-5 md:mb-10 md:w-auto mx-auto">
        <h1 className="text-lg text-white font-semibold text-center md:text-2xl">
          Let’s Discuss Your Challenges
        </h1>
      </div>

      <PartnerWithUsForm />
    </div>
  );
}
