

export default function KeyDatesSection() {
  return (
    <div className="bg-[#F3F9FB] relative py-12 md:py-20 px-4" id="key-dates-section">
      <section className="relative mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-paan-dark-blue uppercase font-bold leading-tight mb-4 md:mb-6 px-4">
            Key Dates 2026
          </h2>
          <p className="text-base md:text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto px-4">
            Mark your calendar for the PAAN Summit & Creative Excellence Awards 2026.
          </p>
        </div>
    
        {/* Desktop Table */}
        <div className="hidden lg:block w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Date</th>
                <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Event</th>
                <th className="text-left py-4 px-6 text-paan-dark-blue font-semibold text-lg">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-paan-dark-blue/20">
                <td className="py-6 px-6 text-paan-dark-blue font-medium">5 Nov 2025</td>
                <td className="py-6 px-6 text-paan-red font-medium">Entry Portal Opens</td>
                <td className="py-6 px-6 text-paan-dark-blue font-light">Submit your entries starting 5 Nov 2025. Showcase your agency, brand, or freelance work to a continental jury.</td>
              </tr>
              <tr className="border-t border-paan-dark-blue/20">
                <td className="py-6 px-6 text-paan-dark-blue font-medium">25 Nov 2025</td>
                <td className="py-6 px-6 text-paan-red font-medium">Early Bird Deadline</td>
                <td className="py-6 px-6 text-paan-dark-blue font-light">Take advantage of reduced entry fees and priority review for submissions received by this date.</td>
              </tr>
              <tr className="border-t border-paan-dark-blue/20">
                <td className="py-6 px-6 text-paan-dark-blue font-medium">15 Aug 2026</td>
                <td className="py-6 px-6 text-paan-red font-medium">Jury Review &amp; Shortlist</td>
                <td className="py-6 px-6 text-paan-dark-blue font-light">Our jury reviews submissions and prepares the shortlist ahead of the final entry deadline.</td>
              </tr>
              <tr className="border-t border-paan-dark-blue/20">
                <td className="py-6 px-6 text-paan-dark-blue font-medium">5 Sept 2026</td>
                <td className="py-6 px-6 text-paan-red font-medium">Final Entry Deadline</td>
                <td className="py-6 px-6 text-paan-dark-blue font-light">All award entries must be submitted by midnight EAT. Late submissions will not be accepted.</td>
              </tr>
              <tr className="border-t border-paan-dark-blue/20">
                <td className="py-6 px-6 text-paan-dark-blue font-medium">23 Sept 2026</td>
                <td className="py-6 px-6 text-paan-red font-medium">Awards Night / Summit</td>
                <td className="py-6 px-6 text-paan-dark-blue font-light">Join us at the PAAN Summit in Nairobi for the prestigious awards ceremony celebrating Africa's creative excellence.</td>
              </tr>
            </tbody>
          </table>
        </div>
    
        {/* Mobile/Tablet Cards */}
        <div className="lg:hidden space-y-6 px-4">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
            <div className="text-paan-dark-blue font-medium text-sm mb-2">5 June 2026</div>
            <div className="text-paan-red font-semibold text-xl mb-3">Entry Portal Opens</div>
            <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
              Submit your entries starting 5 June 2026. Showcase your agency, brand, or freelance work to a continental jury.
            </div>
          </div>
    
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
            <div className="text-paan-dark-blue font-medium text-sm mb-2">30 July 2026</div>
            <div className="text-paan-red font-semibold text-xl mb-3">Early Bird Deadline</div>
            <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
              Take advantage of reduced entry fees and priority review for submissions received by this date.
            </div>
          </div>
    
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
            <div className="text-paan-dark-blue font-medium text-sm mb-2">15 August 2026</div>
            <div className="text-paan-red font-semibold text-xl mb-3">Jury Review &amp; Shortlist</div>
            <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
              Our jury reviews submissions and prepares the shortlist ahead of the final entry deadline.
            </div>
          </div>
    
          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
            <div className="text-paan-dark-blue font-medium text-sm mb-2">5 Sept 2026</div>
            <div className="text-paan-red font-semibold text-xl mb-3">Final Entry Deadline</div>
            <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
              All award entries must be submitted by midnight EAT. Late submissions will not be accepted.
            </div>
          </div>
    
          {/* Card 5 */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-paan-dark-blue/10">
            <div className="text-paan-dark-blue font-medium text-sm mb-2">23 Sept 2026</div>
            <div className="text-paan-red font-semibold text-xl mb-3">Awards Night / Summit</div>
            <div className="text-paan-dark-blue font-light text-sm leading-relaxed">
              Join us at the PAAN Summit in Nairobi for the prestigious awards ceremony celebrating Africa's creative excellence.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
