import { useState } from 'react';
import { faqCategories as buttons, faqs as faqData } from '@/data/faqs';

const FAQs = () => {
  const [activeButton, setActiveButton] = useState("About PAAN");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Custom SVG Icons
  const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#F25849] flex-shrink-0">
      <path fill="currentColor" d="m12.02 15.385l3.288-3.289l-.689-.688l-2.1 2.1V8.596H11.5v4.912l-2.1-2.1l-.688.688zM12.002 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/>
    </svg>
  );

  const RightArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#84C1D9] flex-shrink-0">
      <path fill="currentColor" d="m15.385 12.02l-3.289 3.288l-.688-.689l2.1-2.1H8.596V11.5h4.912l-2.1-2.1l.688-.688zM12.002 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/>
    </svg>
  );

  return (
    <div className="mx-auto max-w-6xl mt-20 pb-20">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {buttons.map((button) => (
          <button
            key={button}
            onClick={() => setActiveButton(button)}
            className={`
              px-4 py-2 md:px-6 md:py-3 rounded-full font-medium text-sm md:text-base
              transition-all duration-200 ease-in-out
              whitespace-nowrap border border-gray-700
              ${activeButton === button
                ? 'bg-[#172840] text-white border-[#D1D3D4] transform scale-105'
                : 'bg-[#D1D3D4] text-gray-700 hover:text-white'
              }
            `}
          >
            {button}
          </button>
        ))}
      </div>
      
      {/* FAQ Accordion Section */}
      <div className="mt-8">
        <div className="space-y-4">
          {faqData[activeButton]?.map((faq, index) => (
            <div key={index} className="border border-[#84C1D9] rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 text-left bg-white hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center ${
                  openFAQ === index ? 'border-b border-dotted border-[#84C1D9]' : ''
                }`}
              >
                <h4 className="font-semibold text-gray-800 text-lg">
                  {faq.question}
                </h4>
                {openFAQ === index ? (
                  <DownArrowIcon />
                ) : (
                  <RightArrowIcon />
                )}
              </button>
              
              {openFAQ === index && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;