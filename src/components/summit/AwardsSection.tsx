

export default function AwardsSection() {
  return (
    <div className="bg-[#DAECF3] relative py-10 sm:py-16 md:py-20 px-4 sm:px-6" id="paan-awards-section">
      <section className="relative mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">     
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-paan-dark-blue">Pan-African Creative Awards</h3>
          <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-6 sm:mb-8 mt-2">Celebrating Africa's boldest agencies and creators.</p>
         </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 justify-items-center md:justify-items-left">
          {/* Award Card 1 */}
         <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
           <div 
             className="absolute inset-0 opacity-80"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
               backgroundSize: '40%',
               backgroundPosition: 'right bottom',
               backgroundRepeat: 'no-repeat',
               marginRight: '30px'
             }}
           />
           <div className="relative z-10 flex flex-col items-left">
             <img 
               src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
               alt="PAAN Award" 
               className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
             />
             <div className="flex flex-col text-left">
               <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Creative Innovation Award</h4>
               <p className="text-white font-light text-xs leading-relaxed">Recognizing breakthrough creative solutions and innovative approaches.</p>
             </div>
           </div>
          </div>
    
          {/* Award Card 2 */}
         <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
           <div 
             className="absolute inset-0 opacity-80"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
               backgroundSize: '40%',
               backgroundPosition: 'right bottom',
               backgroundRepeat: 'no-repeat',
               marginRight: '30px'
             }}
           />
           <div className="relative z-10 flex flex-col items-left">
             <img 
               src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
               alt="PAAN Award" 
               className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
             />
             <div className="flex flex-col text-left">
               <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Pan African Agency of the Year</h4>
               <p className="text-white font-light text-xs leading-relaxed">Honoring the agency pushing creative boundaries across markets.</p>
             </div>
           </div>
          </div>
    
          {/* Award Card 3 */}
         <div className="w-full max-w-80 h-64 sm:h-72 md:h-80 rounded-md shadow-xl overflow-hidden relative flex flex-col items-left justify-center p-4 sm:p-6" style={{background: 'linear-gradient(to bottom right, #172840, #84C1D9)'}}>
           <div 
             className="absolute inset-0 opacity-80"
             style={{
               backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/paan-award-pattern.svg')",
               backgroundSize: '40%',
               backgroundPosition: 'right bottom',
               backgroundRepeat: 'no-repeat',
               marginRight: '30px'
             }}
           />
           <div className="relative z-10 flex flex-col items-left">
             <img 
               src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/new-paan-award.svg" 
               alt="PAAN Award" 
               className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 sm:mb-4 flex-shrink-0"
             />
             <div className="flex flex-col text-left">
               <h4 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Digital Excellence Award</h4>
               <p className="text-white font-light text-xs leading-relaxed">Celebrating outstanding digital campaigns and tech integration.</p>
          </div>
        </div>
         </div>
        </div>
        <div className="flex justify-center gap-2 mt-8 sm:mt-12">
           <button 
             onClick={() => window.location.href = '/paan-awards'} 
             className="bg-paan-red text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center gap-2"
           >
             Explore All Categories
           </button>
                  </div>
     </section>
    </div>
  );
}
