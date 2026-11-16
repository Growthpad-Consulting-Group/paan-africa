import { motion } from "framer-motion";
import Image from "next/image";

export default function ArrivalTransportSection() {
  return (
    <motion.div 
      className="bg-paan-dark-blue py-12 sm:py-16 md:py-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-left mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight text-white">Arrival & Transport</h2>                    
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div className="p-4 sm:p-6 md:p-8 transition-all duration-300">
                    <div className="relative h-48 sm:h-56 md:h-64 mb-4 sm:mb-6 rounded-lg overflow-hidden">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/airport.png"
                            alt="Airport to venue (TBC)"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Airport → Venue (TBC)</h3>
                        <p className="text-white text-sm sm:text-base">Arrive via Jomo Kenyatta International (NBO). The venue is 25–40 minutes by car. Options include Uber, Bolt, Little Cab, or hotel transfers. Complimentary shuttles will run at set times.</p>
                    </div>
                </div>
                
                <div className="p-4 sm:p-6 md:p-8 transition-all duration-300">
                    <div className="relative h-48 sm:h-56 md:h-64 mb-4 sm:mb-6 rounded-lg overflow-hidden">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/city.png"
                            alt="Around the City"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Around the City</h3>
                        <p className="text-white text-sm sm:text-base">Ride-hailing is the easiest way to move around Nairobi. Hotel concierges can arrange taxis or private transfers for VIPs and speakers.</p>
                    </div>
                </div>
            </div>
        </section>
    </motion.div>
  );
}
