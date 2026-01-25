import { ServiceType } from "@/app/types/service";
import ConsultationForm from "./consultation-form";

type WorkWithOurExpartsProps = {
  services: ServiceType[];
};

export default function WorkWithOurExparts({
  services,
}: WorkWithOurExpartsProps) {
  return (
    <div className="">
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border-2 border-blue px-2 py-1 font-bold uppercase md:px-4 md:py-1">
        <p className="text-sm text-[#231F20] md:text-base">
          Work With Our Exparts
        </p>
      </div>

      <ConsultationForm services={services} />
    </div>
  );
}
