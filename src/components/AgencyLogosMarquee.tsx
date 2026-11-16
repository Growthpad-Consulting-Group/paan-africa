"use client";

import Image from 'next/image';
import styles from './AgencyLogosMarquee.module.css';
import { freeMemberLogos as agencyLogosRight, type MemberLogo } from '@/data/members';
import type { AgencyLogo } from '@/features/agencies/lib/agencyService';

const AgencyLogosMarquee = ({ agencies = [] }: { agencies?: AgencyLogo[] }) => {
  // Certified agencies (managed in Sanity: Certified Agency documents, ordered by "Display order")
  const agencyLogosLeft: MemberLogo[] = agencies.map((a, i) => ({ id: i + 1, name: a.name, logo: a.logoUrl }));

  // Create logo items for rendering
  const renderLogoItems = (logos: MemberLogo[]) => 
    logos.map((agency) => (
      <div key={agency.id} className={styles.logoItem}>
        <div className={styles.logoContainer}>
          <Image
            src={agency.logo}
            alt={agency.name}
            width={120}
            height={60}
            className={`${styles.logo} ${agency.isWhite ? styles.logoInverted : ''}`}
          />
        </div>
      </div>
    ));

  // Duplicate logos for seamless loop
  const logosLeftDuplicated = [...agencyLogosLeft, ...agencyLogosLeft, ...agencyLogosLeft];
  const logosRightDuplicated = [...agencyLogosRight, ...agencyLogosRight, ...agencyLogosRight];

  return (
    <section className={styles.section}>
      {/* Top Marquee - Moving Left */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeLeft}`}>
          {renderLogoItems(logosLeftDuplicated)}
        </div>
      </div>

      {/* Bottom Marquee - Moving Right */}
      <div className={styles.marqueeContainer}>
        <div className={`${styles.marquee} ${styles.marqueeRight}`}>
          {renderLogoItems(logosRightDuplicated)}
        </div>
      </div>
    </section>
  );
};

export default AgencyLogosMarquee;

