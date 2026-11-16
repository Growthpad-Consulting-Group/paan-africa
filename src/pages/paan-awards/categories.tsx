import { useState } from "react";
import Head from "next/head";
import SEO from "@/components/SEO";
import PAANAwardsHeader from "@/layouts/paan-awards-header";
import Footer from "@/layouts/footer";
import ScrollToTop from "@/components/ScrollToTop";
import PAANAwardsApplicationModal from "@/components/PAANAwardsApplicationModal";
import PaystackScript from "@/components/PaystackScript";
import CategoriesHero from "@/components/awards/CategoriesHero";
import AwardCategoriesBrowser from "@/components/awards/AwardCategoriesBrowser";
import AwardsCtaSection from "@/components/awards/AwardsCtaSection";
import { getAwards, type AwardsData } from "@/lib/summitService";

type Props = { awards: AwardsData };

const AwardCategoriesPage = ({ awards }: Props) => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const openApplication = () => setIsApplicationModalOpen(true);

  return (
    <>
      <SEO
        title="PAAN Awards 2026 | Browse All Award Categories"
        description="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        keywords="PAAN Awards categories, award categories 2026, African creative awards categories, agency awards Africa, campaign awards, freelancer awards Africa, PAAN Awards nomination, award criteria, creative industry categories"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png"
        ogTitle="PAAN Awards 2026 | Browse All Award Categories"
        ogDescription="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        twitterTitle="PAAN Awards 2026 | Browse All Award Categories"
        twitterDescription="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        canonicalUrl="https://paan.africa/paan-awards/categories"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Awards 2026 - Celebrating Excellence in African Creative & Tech Industry",
              "alternateName": "PAAN Creative & Tech Awards 2026",
              "startDate": "2026-04-22T19:00:00+03:00",
              "endDate": "2026-04-22T23:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "TBC",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "TBC",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-1.2921",
                  "longitude": "36.8219"
                }
              },
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png",
                "https://paan.africa/assets/images/hero.webp"
              ],
              "description": "Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria and find the right category for your nomination.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/paan-awards",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-09-01T00:00:00+03:00",
                "description": "Free attendance for PAAN Awards 2026 ceremony"
              },
              "performer": { 
                "@type": "Organization", 
                "name": "PAAN Africa",
                "url": "https://paan.africa"
              },
              "organizer": { 
                "@type": "Organization", 
                "name": "Pan-African Agency Network (PAAN)", 
                "url": "https://paan.africa",
                "logo": "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Creative professionals, tech industry leaders, agencies, freelancers, digital innovators, award nominees and winners"
              },
              "eventSchedule": {
                "@type": "Schedule",
                "startTime": "19:00",
                "endTime": "23:00",
                "duration": "PT4H"
              },
              "award": {
                "@type": "Award",
                "name": "PAAN Awards 2026",
                "description": "Annual awards recognizing excellence in African creative and tech industry",
                "sponsor": {
                  "@type": "Organization",
                  "name": "Pan-African Agency Network (PAAN)"
                }
              },
              "keywords": "PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards"
            }),
          }}
        />
      </Head>

      <main className="relative">
        <PAANAwardsHeader navLinkColor="text-white" onApplyNowClick={openApplication} />

        <CategoriesHero onApplyNowClick={openApplication} />

        <AwardCategoriesBrowser
          agencyGroups={awards.agencyGroups}
          freelancerGroups={awards.freelancerGroups}
          onApply={openApplication}
        />

        <AwardsCtaSection setIsApplicationModalOpen={setIsApplicationModalOpen} />

        <Footer />
        <ScrollToTop />
        <PaystackScript />

        <PAANAwardsApplicationModal isOpen={isApplicationModalOpen} onClose={() => setIsApplicationModalOpen(false)} />
      </main>
    </>
  );
};

export async function getStaticProps() {
  try {
    return { props: { awards: await getAwards() }, revalidate: 3600 };
  } catch (error) {
    console.error("Error loading awards from Sanity:", error);
    return {
      props: { awards: { agencyGroups: [], freelancerGroups: [], featuredAgencyIds: [], featuredFreelancerIds: [] } },
      revalidate: 60,
    };
  }
}

export default AwardCategoriesPage;
