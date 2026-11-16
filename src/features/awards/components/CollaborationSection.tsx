

export default function CollaborationSection() {
  return (
    <div className="bg-gray-50 relative py-16 sm:py-20 md:py-24">
      
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-bold mb-4">
            In Collaboration With
          </h3>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Partnering with industry leaders to drive innovation and excellence
          </p>
        </div>
        
        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-2 md:gap-4 max-w-5xl mx-auto">
          
          {/* AIA Logo */}
          <div className="group relative">
            <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <img 
                src="/assets/images/partners/aia-2.png" 
                alt="AIA Logo" 
                className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
    
          {/* PAAN Logo */}
          <div className="group relative">
            <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <img 
                src="/assets/images/partners/paan.png" 
                alt="PAAN Logo" 
                className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
          
          {/* IAN Logo */}
          <div className="group relative sm:col-span-2 lg:col-span-1 sm:justify-self-center lg:justify-self-auto">
            <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
              <img 
                src="/assets/images/partners/IAN.png" 
                alt="IAN Logo" 
                className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
    
        
      </section>
    </div>
  );
}
