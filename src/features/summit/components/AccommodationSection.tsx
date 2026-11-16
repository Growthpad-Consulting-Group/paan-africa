import { motion } from "framer-motion";
import Image from "next/image";

export default function AccommodationSection() {
  return (
    <motion.div 
       className="bg-white py-12 sm:py-16 md:py-20 pt-16 sm:pt-20 md:pt-24" 
       id="accommodation"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       viewport={{ once: true, margin: "-100px" }}
     >
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-left mb-12 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight mb-4 sm:mb-6 text-paan-dark-blue">Accommodation</h2>
                <p className="text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8 text-gray-600 max-w-3xl">
                    We've secured special rates at partner hotels near the venue. Options range from luxury hotels to budget-friendly accommodations.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/sankara.png"
                            alt="Sankara Nairobi"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Sankara Nairobi</h4>
                        <p className="text-gray-600">Luxury • 6 min drive</p>
                    </div>
                </div>
                
                <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/park-inn.png"
                            alt="Park Inn by Radisson"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Park Inn by Radisson</h4>
                        <p className="text-gray-600">Mid-range • 5 min drive</p>
                    </div>
                </div>
                
                <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/ibis.png"
                            alt="Ibis Styles Nairobi"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Ibis Styles Nairobi</h4>
                        <p className="text-gray-600">Budget • 10 min drive</p>
                    </div>
                </div>
                
                <div className="relative rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/trademark.png"
                            alt="Trademark Hotel"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h4 className="text-xl font-bold text-paan-dark-blue mb-2">Trademark Hotel</h4>
                        <p className="text-gray-600">Village Market • 12 min drive</p>
                    </div>
                </div>
            </div>
        </section>
    </motion.div>
  );
}
