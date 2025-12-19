export default function WhyChooseUs() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden mb-5 md:mb-15">
      <div className="relative w-full">
        <hr className="absolute z-10 h-0.5 bg-black top-1/2 left-0 w-full" />

        <div className="flex justify-center">
          <div className="relative z-20 py-2 md:py-3 px-3 md:px-14 w-auto bg-blue rounded-2xl md:rounded-3xl my-10 flex justify-center">
            <h2 className="text-white text-center font-semibold text-xl md:text-3xl">
              Why Choose Us
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl w-[90%] space-y-3">
        <h1 className="text-lg md:text-2xl font-bold">
          Why Leading Factories Trust TGS Advisors
        </h1>
        <ul className="text-sm md:text-xl space-y-2">
          <li>
            <span className="mr-2 size-3 bg-black inline-block"></span> Proven
            40-Point Factory Analysis
          </li>
          <li>
            <span className="mr-2 size-3 bg-black inline-block"></span>{" "}
            Result-Based Consultancy (not theory)
          </li>
          <li>
            <span className="mr-2 size-3 bg-black inline-block"></span>{" "}
            Customized Plan for Each Facotry
          </li>
          <li>
            <span className="mr-2 size-3 bg-black inline-block"></span> 100%
            Confidential & Ethical Process
          </li>
          <li>
            <span className="mr-2 size-3 bg-black inline-block"></span>{" "}
            Continuous Support After Project Completion
          </li>
        </ul>
      </div>
    </div>
  );
}
