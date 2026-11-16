import type { Localize, Agency } from "./types";


type Props = {
  L: Localize;
  agency: Agency;
};

export default function AgencyServices({ L, agency }: Props) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
        
        <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              {/* Quote icon - large and on the left */}
              <div className="flex-shrink-0">           
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" className="text-paan-red opacity-80">
                  <path fill="currentColor" d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10m11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10"/>
                </svg>
              </div>
              
              {/* Content on the right */}
              <div className="flex-1">
                {/* Testimonial text */}
                <blockquote className="text-xl sm:text-2xl font-medium text-gray-800 leading-relaxed mb-8 italic">
                  {L(agency.testimonialQuote)}
                </blockquote>
                
                {/* Attribution */}
                <div className="flex flex-col items-start space-y-2">
                  <div className="w-16 h-px bg-gradient-to-r from-paan-dark-blue to-paan-purple"></div>
                  {(agency.testimonialName || agency.testimonialRole) && (
                    <cite className="not-italic">
                      {agency.testimonialName && <div className="font-semibold text-lg text-gray-900">{agency.testimonialName}</div>}
                      {agency.testimonialRole && <div className="text-gray-600 text-sm">{agency.testimonialRole}</div>}
                    </cite>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
