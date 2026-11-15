import Image from 'next/image';
import { clientLogos as agencyLogos } from '@/data/clients';

export default function AgencyLogosGrid() {
  // Sample agency logos - replace with your actual logos

  return (
    <section className=" w-full bg-white py-14">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-normal uppercase text-center mb-2 text-gray-800">
            SERVING THE WORLD'S GREATEST BRANDS
        </h2>
        <h3 className="text-xl font-extralight text-center text-gray-800 pb-4">PAAN agencies have proudly served many of the world's most heralded brands.</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {agencyLogos.map((agency) => (
            <div
              key={agency.id}
              className="w-32 aspect-[3/2] relative grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={agency.logo}
                alt={agency.name}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 