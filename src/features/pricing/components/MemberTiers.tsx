import Image from 'next/image';
import React from 'react';

import { membershipTables, type TierCell } from '@/features/pricing/data/membership';
import { bookingLinks } from '@/shared/data/site';

const TONE_CLASS = { associate: "text-[#A1A1A1]", full: "text-[#C0614D]", inherit: "" } as const;
const LABEL_CELL = "p-4 border border-gray-200 w-[200px] h-[100px] bg-[#D1D3D4] font-semibold text-center";
const VALUE_CELL = "p-4 border border-gray-200 w-[200px] h-[100px] text-center";

const renderCell = (cell: TierCell) => {
  if (typeof cell === "string") return cell;
  if ("badge" in cell) {
    return (
      <div className="flex justify-center items-center h-full">
        <Image src={`/assets/images/${cell.badge}-badge.webp`} width={50} height={50} alt="Strategic Collaboration" />
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center h-full">
      <svg xmlns="http://www.w3.org/2000/svg" {...(cell.tone !== "inherit" ? { className: TONE_CLASS[cell.tone] } : {})} width="32" height="32" viewBox="0 0 32 32">
        <path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z" />
      </svg>
    </div>
  );
};

const TierGroupBody = ({ group }: { group: (typeof membershipTables)[number][number] }) => (
  <tbody>
    {group.title && (
      <tr className="bg-gray-50">
        <td colSpan={5} className="p-4 font-bold text-lg text-[#172840] bg-gray-100">{group.title}</td>
      </tr>
    )}
    {group.rows.map((row) => (
      <tr key={row.label}>
        <td className={LABEL_CELL}>{row.label}</td>
        {row.cells.map((cell, i) => <td key={i} className={VALUE_CELL}>{renderCell(cell)}</td>)}
      </tr>
    ))}
  </tbody>
);

const MemberTiers = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-16">
      <div className="p-8 rounded-lg w-full max-w-7xl mx-4 relative overflow-hidden">
        
        <div className="sticky top-0 bg-gray-100 py-8 mt-28 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#172840] mb-6">
            PAAN Agency Membership Tiers
          </h1>
          <p className="text-[#172840] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore tailored benefits for every agency stage. From visibility and client access to collaboration and growth, each PAAN membership tier offers unique value to help your agency thrive across Africa.
          </p>
        </div>

        <table className="w-full mt-4 relative">
          <thead>
            <tr>
              <th className="p-4 text-center font-semibold text-lg text-[#172840] bg-[#FFFFFF] border border-[#FFFFFF] m-2 text-left w-[200px] h-[100px]">
                Benefit<br/> Category
              </th>
              {/* <th className="p-4 text-center font-semibold text-lg text-white bg-[#172840] m-2 w-[200px] h-[100px]">
                Free
              </th> */}
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#A1A1A1] m-2 w-[200px] h-[100px]">
                Associate<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-red text-white rounded-md shadow hover:bg-paan-blue transition-colors text-sm font-medium"
                  onClick={() => window.open(bookingLinks.pricingCall, '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#C0614D] m-2 w-[200px] h-[100px]">
                Full<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-dark-blue text-white rounded-md shadow hover:bg-paan-blue transition-colors text-sm font-medium"
                  onClick={() => window.open(bookingLinks.pricingCall, '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#F2B706] border border-[#F2B706] m-2 w-[200px] h-[100px]">
                Gold<br/>
                <button
                  className="mt-2 px-4 py-2 bg-paan-blue text-white rounded-md shadow hover:bg-paan-red transition-colors text-sm font-medium"
                  onClick={() => window.open(bookingLinks.pricingCall, '_blank')}
                >
                  Book a call for pricing
                </button>
              </th>
            </tr>
          </thead>
          {membershipTables[0].map((group, gi) => (
            <TierGroupBody key={gi} group={group} />
          ))}
        </table>

        <table className="w-full mt-10 relative">
          <thead>
            <tr>
              <th className="p-4 text-center font-semibold text-lg text-[#172840] bg-transparent m-2 text-left w-[200px] h-[100px]">
                Revenue Growth
              </th>
              {/* <th className="p-4 text-center font-semibold text-lg text-white bg-[#172840] m-2 w-[200px] h-[100px]">
                Free Member
              </th> */}
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#A1A1A1] m-2 w-[200px] h-[100px]">
                Associate
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#C0614D] m-2 w-[200px] h-[100px]">
                Full
              </th>
              <th className="p-4 text-center font-semibold text-lg text-white bg-[#F2B706] border border-[#F2B706] m-2 w-[200px] h-[100px]">
                Gold
              </th>
            </tr>
          </thead>
          {membershipTables[1].map((group, gi) => (
            <TierGroupBody key={gi} group={group} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default MemberTiers;
