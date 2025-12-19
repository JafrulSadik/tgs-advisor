import SendIcon from "@/public/images/contact-us/send-icon.svg";
import Image from "next/image";

export default function ContactUsForm() {
  return (
    <form action="" className="w-full">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 md:col-span-6">
          <input
            className="w-full rounded-sm bg-white p-3 text-gray-700 outline-none md:p-4"
            type="text"
            placeholder="First Name"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            className="w-full rounded-sm bg-white p-3 text-gray-700 outline-none md:p-4"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            className="w-full rounded-sm bg-white p-3 text-gray-700 outline-none md:p-4"
            type="text"
            placeholder="Phone/Whatsapp"
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input
            className="w-full rounded-sm bg-white p-3 text-gray-700 outline-none md:p-4"
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="col-span-12">
          <textarea
            className="w-full rounded-sm bg-white p-3 text-gray-700 outline-none md:p-4"
            placeholder="Message"
            name=""
            id=""
            cols={30}
            rows={5}
          ></textarea>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="mx-auto flex items-center gap-2 rounded-xl bg-cyan px-5 py-2 text-white hover:bg-[#ebaa12] md:px-7 md:py-3"
          type="submit"
        >
          <span className="font-bold">Send Message</span>
          <Image src={SendIcon} alt="Arrow Right Up" />
        </button>
      </div>
    </form>
  );
}
