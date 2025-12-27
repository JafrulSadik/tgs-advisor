import { serviceData } from "@/utils/service-data";

export default function ConsultationForm() {
  return (
    <form action="" className="flex w-full justify-center my-10 ">
      <div className="grid w-[90%] max-w-5xl grid-cols-12 md:grid-rows-6 gap-4">
        <div className="col-span-12 lg:col-span-6 row-span-1">
          <input
            type="text"
            className="w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4"
            placeholder="Full name"
          />
        </div>
        <div className="col-span-12 lg:col-span-6 row-span-1">
          <input
            type="text"
            className="w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4"
            placeholder="Company"
          />
        </div>
        <div className="col-span-12 lg:col-span-6 row-span-1">
          <input
            type="text"
            className="w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4"
            placeholder="Email"
          />
        </div>
        <div className="col-span-12 lg:col-span-6 row-span-1">
          <input
            type="text"
            className="w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4"
            placeholder="Phone / WhatsApp"
          />
        </div>
        <div className="col-span-12 row-span-1">
          <select className="w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4">
            {serviceData.map((service) => (
              <option key={service.tag} value={service.tag}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 row-span-2">
          <textarea
            className="h-full w-full rounded-md bg-blue/20 p-3 font-normal text-gray-700 outline-none md:rounded-lg md:p-4"
            placeholder="Project summary, location, size, timeline"
          />
        </div>

        <div className="col-span-12 row-span-1 flex justify-center md:justify-end items-center gap-5">
          <button className="min-w-28 rounded-xl bg-blue px-5  md:px-10 py-3 font-semibold text-white hover:opacity-90 text-sm md:text-base">
            Request Consultation
          </button>
        </div>
      </div>
    </form>
  );
}
