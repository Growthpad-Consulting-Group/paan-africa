import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function WhyExhibitSection() {
  return (
    <motion.div 
      className="bg-white py-12 sm:py-16 md:py-20" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
            Why Exhibit at PAAN Summit 2026?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with Africa's leading creative and tech professionals, showcase your innovations, and build lasting partnerships in the continent's premier industry gathering.
          </p>
        </motion.div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div 
            className="bg-paan-blue/10 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:account-group" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Network with Leaders</h3>
            <p className="text-gray-600">Connect with 500+ industry leaders, investors, and decision-makers from across Africa.</p>
          </motion.div>
    
          <motion.div 
            className="bg-paan-blue/10 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:bullhorn" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Showcase Innovation</h3>
            <p className="text-gray-600">Present your latest products and services to a highly engaged audience of industry professionals.</p>
          </motion.div>
    
          <motion.div 
            className="bg-paan-blue/10 rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon icon="mdi:handshake" className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-3">Build Partnerships</h3>
            <p className="text-gray-600">Forge strategic partnerships and explore collaboration opportunities with like-minded organizations.</p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
