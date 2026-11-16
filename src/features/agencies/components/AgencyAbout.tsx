import type { Video, Translate, Localize, Agency } from "./types";
import type { RefObject } from "react";


type Props = {
  aboutTitle: string;
  aboutParagraphs: string[];
  t: Translate;
  agency: Agency;
  L: Localize;
  video: Video | null;
  videoRef: RefObject<HTMLVideoElement | null>;
};

export default function AgencyAbout({ aboutTitle, aboutParagraphs, t, agency, L, video, videoRef }: Props) {
  return (
    <div className="bg-paan-blue relative">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content Column */}
          <div className="order-2 md:order-1">
            <div className="space-y-8">
              {/* Main Heading */}
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-paan-dark-blue leading-tight">
                  {aboutTitle}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue/60"></div>
              </div>
    
              {/* Description */}
              <div className="space-y-4">
                {aboutParagraphs.map((para, i) => (
                  <p key={i} className="text-lg sm:text-xl leading-relaxed text-paan-dark-blue/90 font-light">
                    {para}
                  </p>
                ))}
              </div>
    
                                  {/* Areas of Specialization */}
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-paan-dark-blue mb-4">
                    {t('certifiedAgencies.common.about.specializationTitle')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {agency.specializations.map((s, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-paan-dark-blue rounded-full"></div>
                        <span className="text-paan-dark-blue/90">{L(s)}</span>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
          </div>
    
          {/* Video Column */}
          <div className="order-1 md:order-2">
            <div className="relative group">
              {/* Video Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                {video?.kind === 'embed' && (
                  <iframe
                    className="w-full h-auto aspect-video object-cover"
                    src={video.src}
                    title={`${agency.name} video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
                {video?.kind === 'file' && (
                  <video ref={videoRef} className="w-full h-auto aspect-video object-cover" src={video.src} controls playsInline preload="metadata">
                    {t('certifiedAgencies.common.hero.videoFallback')}
                  </video>
                )}
              </div>
    
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
