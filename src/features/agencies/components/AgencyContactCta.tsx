import type { Social, Translate, Agency } from "@/features/agencies/components/types";
import { Icon } from "@iconify/react";

type Props = {
  setIsContactModalOpen: (open: boolean) => void;
  t: Translate;
  agency: Agency;
  socials: Social[];
};

export default function AgencyContactCta({ setIsContactModalOpen, t, agency, socials }: Props) {
  return (
    <section className="relative mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
      <div className="text-center space-y-8">
        {/* Main Contact Button */}
        <div>
                        <button
              className="bg-paan-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-paan-dark-blue transition-colors duration-200 text-lg"
              onClick={() => setIsContactModalOpen(true)}
            >
              {t('certifiedAgencies.common.contact.contactAgency')}
            </button>
        </div>
    
        {/* Social Media Links */}
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">{`Follow ${agency.name} on social media`}</p>
          <div className="flex justify-center items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:scale-110"
                aria-label={s.label}
              >
                <Icon
                  icon={s.icon}
                  width="28"
                  height="28"
                  className={`text-gray-400 ${s.hover} transition-colors duration-300`}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
