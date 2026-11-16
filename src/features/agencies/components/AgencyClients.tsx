import type { Agency } from "@/features/agencies/components/types";
import Image from "next/image";

type Props = {
  clientsTitle: string;
  agency: Agency;
};

export default function AgencyClients({ clientsTitle, agency }: Props) {
  return (
    <div className="bg-white py-16 sm:py-20 relative z-10">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue text-center mb-10">{clientsTitle}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 items-center justify-center">
          {agency.clientLogos.map((logo, i) => (
            <div key={i} className="flex items-center justify-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image
                src={logo.url}
                alt={logo.alt || `Client logo ${i + 1}`}
                width={120}
                height={60}
                className="object-contain h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
