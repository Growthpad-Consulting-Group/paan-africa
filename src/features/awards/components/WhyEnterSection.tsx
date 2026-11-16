import { Icon } from "@iconify/react";

export default function WhyEnterSection() {
  return (
    <div className="bg-white relative py-20" id="detailed-info-section">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl text-paan-dark-blue uppercase font-bold leading-tight mb-6">
            Celebrating Africa's Independent Agencies, Creativity & Innovation
          </h2>
          <p className="text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto">
            The Pan-African Agency Network (PAAN) proudly invites entries for the PAAN Awards 2026 — the premier platform celebrating the creativity, innovation, and impact of Africa's independent agencies.
          </p>
          <p className="text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto mt-4">
            This is your chance to showcase your agency's best work, gain continental recognition, and position your brand as a leader shaping Africa's creative economy.
          </p>
        </div>
    
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Why Enter Section */}
          <div className="bg-gradient-to-br from-paan-blue/10 to-paan-red/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-paan-dark-blue mb-6">Why Enter?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-paan-red rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:trophy" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Credibility & Recognition</h4>
                  <p className="text-gray-600 text-sm">Stand out as a top-performing agency on a continental stage.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-paan-blue rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:handshake" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Client Attraction</h4>
                  <p className="text-gray-600 text-sm">Strengthen your pitch power with award-winning credentials.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-paan-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:account-group" className="w-5 h-5 text-paan-dark-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Talent Magnet</h4>
                  <p className="text-gray-600 text-sm">Attract top creative talent eager to join award-winning teams.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:eye" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Visibility</h4>
                  <p className="text-gray-600 text-sm">Get featured across PAAN's platforms, media partners, and industry events.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:network" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Networking</h4>
                  <p className="text-gray-600 text-sm">Gain access to brand leaders, decision-makers, and fellow innovators.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon icon="mdi:medal" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-paan-dark-blue mb-1">Prestige</h4>
                  <p className="text-gray-600 text-sm">Winners receive the official PAAN Award badge — a seal of excellence for all communications.</p>
                </div>
              </div>
            </div>
          </div>
    
          {/* Who Can Enter Section */}
          <div className="bg-gradient-to-br from-paan-yellow/10 to-paan-blue/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-paan-dark-blue mb-6">Who Can Enter?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Independent agencies across Africa</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">PR, advertising, media, digital, design, branding, and specialist agencies</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Production houses, content creators, and communication consultancies</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">Agencies working in both local and regional markets</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
