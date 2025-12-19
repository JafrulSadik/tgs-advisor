import { WhatsappIcon } from "@/public";
import { PhoneIcon } from "@/public/icons";
import { Contact } from "lucide-react";
import Image from "next/image";

export default function ContactUsLeft() {
  return (
    <div className="bg-blue col-span-12 rounded-2xl p-6 md:p-8 lg:col-span-4 lg:p-10">
      <div className="w-fit rounded-full bg-white p-4">
        <Contact className="text-blue" />
      </div>

      <div className="text-white">
        <p className="my-4 font-bold">Address:</p>

        <p className="my-8">
          House : 66 Road : 18 Sector : 11 Uttara, Dhaka, Bangladesh Mobile:
          +8801713-262940
        </p>

        <h3 className="py-2 text-xl font-bold">
          Get in touch with us on WhatsApp!
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex w-fit items-center gap-2 rounded-full bg-[#1ABD50] py-2 px-3 md:px-4 md:py-3  text-base">
            <Image
              src={WhatsappIcon}
              alt="Whatsapp"
              width={20}
              height={20}
              className=""
            />
            <span>Whatsapp</span>
          </div>

          <div className="w-fit rounded-full bg-cyan p-3 md:p-4">
            <Image
              src={PhoneIcon}
              alt="Phone"
              width={18}
              height={18}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
