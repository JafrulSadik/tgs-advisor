export default function WhyChooseUs() {
  return (
    <div className="flex flex-col items-center max-w-6xl w-[90%] mx-auto overflow-hidden mb-5 md:mb-15">
      <div className="py-4 px-8 md:px-14 bg-blue rounded-[14px] md:rounded-2xl w-[90%] mb-5 md:mb-15 md:w-auto mx-auto">
        <h1 className="text-lg text-white font-semibold text-center md:text-2xl">
          Why Choose Us
        </h1>
      </div>

      <div className="mx-auto w-fit space-y-8">
        <h1 className="text-lg md:text-2xl font-bold">
          Why Leading Factories Trust TGS Advisors
        </h1>
        <ul className="text-sm md:text-xl space-y-4">
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
