import { Icon } from "@iconify/react";
import type { SummitEdition } from "@/features/summit/lib/summitService";

/** Venue, dates and attendance line shown under the hero headings (values come from the Summit Edition document). */
export default function EventLocationAndDate({ edition }: { edition: SummitEdition }) {
    
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="break-words sm:whitespace-nowrap">{`${edition.venueName} - `}<strong>{edition.displayDates}</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:user-group" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">{edition.inPersonLabel}</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:globe" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">{edition.streamingLabel}</span>
      </div>
    </div>
  );
}
