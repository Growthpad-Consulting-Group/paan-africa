import { createContext, useContext, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import BoothInfoModal from "@/components/summit/BoothInfoModal";
import type { ExhibitorBooth } from "@/lib/summitService";

/** Short click sound (Web Audio) when a booth is pressed. */
function playClickSound() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const audioContext = new AudioCtx();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
}

const BoothContext = createContext<{ boothData: Record<number, ExhibitorBooth>; onBoothClick: (n: number) => void }>({ boothData: {}, onBoothClick: () => {} });

const buttonClassFor = (status?: string) => {
  switch (status) {
    case 'Available': return 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:scale-105';
    case 'Reserved': return 'bg-paan-yellow border-2 border-paan-yellow hover:bg-paan-yellow/80 hover:scale-105';
    case 'Booked': return 'bg-paan-red border-2 border-paan-red hover:bg-paan-red/80 hover:scale-105';
    default: return 'bg-white border-2 border-gray-300 hover:bg-gray-50 hover:scale-105';
  }
};

/** One clickable booth on the floor plan. Reads its status from the surrounding ExhibitionFloorSection. */
function BoothButton({ boothNumber, className, children }: { boothNumber: number; className?: string; children?: ReactNode }) {
  const { boothData, onBoothClick } = useContext(BoothContext);
  const booth = boothData[boothNumber];
  return (
    <button
      onClick={() => onBoothClick(boothNumber)}
      className={`${buttonClassFor(booth?.status)} rounded-lg p-2 transition-all duration-200 aspect-square w-full h-20 sm:h-24 ${className || ''}`}
    >
      {children}
    </button>
  );
}

export default function ExhibitionFloorSection({ booths }: { booths: ExhibitorBooth[] }) {
  // Booths come from Sanity (Exhibition Booth documents), indexed by booth number
  const boothData = Object.fromEntries(booths.map((booth) => [booth.number, booth]));
  const [selectedBooth, setSelectedBooth] = useState<ExhibitorBooth | null>(null);

  const handleBoothClick = (boothNumber: number) => {
    playClickSound();
    const booth = boothData[boothNumber];
    if (booth) setSelectedBooth(booth);
  };

  return (
    <BoothContext.Provider value={{ boothData, onBoothClick: handleBoothClick }}>
      <motion.div 
         className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-32" 
         id="visa-requirements"
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         viewport={{ once: true, margin: "-100px" }}
       >
        <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div 
            className="text-left mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
    
          {/* Filter and Legend Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            {/* Booth Filter */}
            <div className="flex flex-wrap gap-2">
              <button className="bg-paan-blue text-white px-4 py-2 rounded-lg text-sm font-medium">
                All Booths
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                Available
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                Reserved
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300">
                Booked
              </button>
            </div>
    
            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white border border-gray-300 rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-paan-yellow rounded-full"></div>
                <span>Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-paan-red rounded-full"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
        
          {/* Floor Plan Container */}
          <div className="bg-white border border-paan-dark-blue rounded-lg p-6 relative">
            {/* Exit Indicator - Top Middle */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-paan-red text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Icon icon="mdi:exit-run" className="w-4 h-4" />
              EXIT
            </div>
          
            {/* Entrance Indicator - Bottom Middle */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-paan-blue text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <Icon icon="mdi:login" className="w-4 h-4" />
              ENTRANCE
            </div>
          
          
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left Section - Standard Booths */}
              <div>
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                        {/* Booth 1 */}
                      <button 
                        onClick={() => handleBoothClick(1)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 1</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </button>
                    
                      {/* Booth 2 */}
                      <button 
                        onClick={() => handleBoothClick(2)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 2</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </button>
                    
                      {/* Booth 3 */}
                      <button 
                        onClick={() => handleBoothClick(3)}
                        className="bg-paan-yellow border-2 border-paan-yellow rounded-lg p-2 hover:bg-paan-yellow/80 transition-colors aspect-square w-full h-20 sm:h-24"
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 3</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </button>
                    
                      {/* Booth 4 */}
                      <button 
                        onClick={() => handleBoothClick(4)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 4</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </button>
    
                      {/* Booth 5 */}
                      <button 
                        onClick={() => handleBoothClick(5)}
                        className="bg-white border-2 border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors aspect-square w-full h-20 sm:h-24"
                      >
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 5</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </button>
                  </div>
                
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                    {/* Booth 6 */}
                  <BoothButton boothNumber={6}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 6</h4>
                      <p className="text-sm text-gray-600">USD 1,800</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 7 */}
                  <BoothButton boothNumber={7}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 7</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 8 */}
                  <BoothButton boothNumber={8}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 8</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 9 */}
                  <BoothButton boothNumber={9}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 9</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 10 */}
                  <BoothButton boothNumber={10}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 10</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">Pavilion</p>
                    </div>
                  </BoothButton>
                  </div>
    
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                    {/* Booth 11 */}
                  <BoothButton boothNumber={11}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 11</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 12 */}
                  <BoothButton boothNumber={12}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 12</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 13 */}
                  <BoothButton boothNumber={13}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 13</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 14 */}
                  <BoothButton boothNumber={14}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 14</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 15 */}
                  <BoothButton boothNumber={15}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 15</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                  </div>
    
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
                    {/* Booth 16 */}
                  <BoothButton boothNumber={16}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 16</h4>
                      <p className="text-sm text-gray-600">USD 1,800</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 17 */}
                  <BoothButton boothNumber={17}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 17</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 18 */}
                  <BoothButton boothNumber={18}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 18</h4>
                      <p className="text-sm text-gray-600">USD 1,800</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 19 */}
                  <BoothButton boothNumber={19}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 19</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 20 */}
                  <BoothButton boothNumber={20}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 20</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                  </div>
                </div>
              </div>
    
              {/* Right Section - Premium Booths & Pavilions */}
              <div>
              <div>
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                        {/* Booth 21 */}
                      <BoothButton boothNumber={21}>
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 21</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </BoothButton>
                    
                      {/* Booth 22 */}
                      <BoothButton boothNumber={22}>
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 22</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </BoothButton>
                    
                      {/* Booth 23 */}
                      <BoothButton boothNumber={23}>
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 23</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </BoothButton>
                    
                      {/* Booth 24 */}
                      <BoothButton boothNumber={24}>
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 24</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </BoothButton>
    
                      {/* Booth 25 */}
                      <BoothButton boothNumber={25}>
                        <div className="flex flex-col items-center justify-center text-center h-full">
                          <h4 className="font-bold text-paan-dark-blue text-xs sm:text-sm">Booth 25</h4>
                          <p className="text-xs text-gray-600">USD 1,000</p>
                          <p className="text-xs font-bold text-paan-dark-blue">3×3</p>
                        </div>
                      </BoothButton>
                  </div>
                
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                    {/* Booth 26 */}
                  <BoothButton boothNumber={26}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 26</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 27 */}
                  <BoothButton boothNumber={27}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 27</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 28 */}
                  <BoothButton boothNumber={28}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 28</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 29 */}
                  <BoothButton boothNumber={29}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 29</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 30 */}
                  <BoothButton boothNumber={30}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 30</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                  </div>
    
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-20">
                    {/* Booth 31 */}
                  <BoothButton boothNumber={31}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 31</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 32 */}
                  <BoothButton boothNumber={32}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 32</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 33 */}
                  <BoothButton boothNumber={33}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 33</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">Pavillion</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 34 */}
                  <BoothButton boothNumber={34}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 34</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 35 */}
                  <BoothButton boothNumber={35}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 35</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                  </div>
    
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
                    {/* Booth 36 */}
                  <BoothButton boothNumber={36}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 36</h4>
                      <p className="text-sm text-gray-600">USD 1,800</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×6</p>
                    </div>
                  </BoothButton>
                
                  {/* Booth 37 */}
                  <BoothButton boothNumber={37}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 37</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">Pavilion</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 38 */}
                  <BoothButton boothNumber={38}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 38</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 39 */}
                  <BoothButton boothNumber={39}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 39</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
    
                  {/* Booth 40 */}
                  <BoothButton boothNumber={40}>
                    <div className="flex flex-col items-center text-center">
                      <h4 className="font-bold text-paan-dark-blue">Booth 40</h4>
                      <p className="text-sm text-gray-600">USD 1,000</p>
                      <p className="text-sm font-bold text-paan-dark-blue">3×3</p>
                    </div>
                  </BoothButton>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
    
          
          </motion.div>
        </section>
      </motion.div>
      {selectedBooth && <BoothInfoModal booth={selectedBooth} onClose={() => setSelectedBooth(null)} />}
    </BoothContext.Provider>
  );
}
