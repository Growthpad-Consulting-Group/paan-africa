import { useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { staggerContainer, fadeInUp } from "@/components/summit/motion";
import type { SummitExperience } from "@/lib/summitService";
export default function SummitExperiencesSection({ summitExperiences = [] }: { summitExperiences?: SummitExperience[] }) {
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleBookNow = (experience: SummitExperience) => {
    window.location.href = `/summit/travel-guide/experiences/${experience.id}`;
  };

  return (
    <motion.div 
      className="bg-white py-12 sm:py-16 md:py-20" 
      id="summit-experiences"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight mb-4 sm:mb-6 text-paan-dark-blue">
            Summit Experiences
          </h2>
          <p className="text-base sm:text-lg font-light leading-relaxed text-gray-600 max-w-3xl mx-auto">
            Enhance your summit experience with exclusive wellness and cultural tours in Nairobi
          </p>
        </motion.div>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.summit-exp-button-next',
              prevEl: '.summit-exp-button-prev',
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="summit-experiences-swiper"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {summitExperiences.map((experience) => (
              <SwiperSlide key={experience.id}>
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col min-h-[600px]"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative h-56 sm:h-64 flex-shrink-0">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-paan-red text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                        {experience.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 backdrop-blur-sm text-paan-dark-blue px-4 py-2 rounded-full text-lg font-bold">
                        ${experience.price}
                        <span className="text-xs font-normal ml-1">{experience.priceUnit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-2 line-clamp-2">
                      {experience.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {experience.subtitle}
                    </p>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3 flex-grow">
                      {experience.description}
                    </p>

                    {/* Features/Highlights */}
                    {experience.highlights && (
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {experience.highlights.slice(0, 3).map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                              <Icon icon="mdi:check-circle" className="text-paan-red mt-0.5 flex-shrink-0" width="16" height="16" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Duration & Availability */}
                    <div className="mb-4 space-y-1 text-xs text-gray-500">
                      {experience.duration && (
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:clock-outline" width="14" height="14" />
                          <span>{experience.duration}</span>
                        </div>
                      )}
                      {experience.availability && (
                        <div className="flex items-center gap-2">
                          <Icon icon="mdi:calendar-check" width="14" height="14" />
                          <span>{experience.availability}</span>
                        </div>
                      )}
                    </div>

                    {/* Price Note */}
                    {experience.priceNote && (
                      <p className="text-xs text-gray-500 mb-4 italic">
                        {experience.priceNote}
                      </p>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto">
                      <motion.button
                        onClick={() => handleBookNow(experience)}
                        className="w-full bg-paan-red text-white px-6 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm shadow-lg flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon icon="mdi:calendar-plus" width="20" height="20" />
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="summit-exp-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-paan-red hover:text-white transition-all duration-300 group">
            <Icon
              icon="mdi:chevron-left"
              width={28}
              height={28}
              className="text-paan-dark-blue group-hover:text-white"
            />
          </button>
          <button className="summit-exp-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-paan-red hover:text-white transition-all duration-300 group">
            <Icon
              icon="mdi:chevron-right"
              width={28}
              height={28}
              className="text-paan-dark-blue group-hover:text-white"
            />
          </button>
        </div>
      </section>
    </motion.div>
  );
}
