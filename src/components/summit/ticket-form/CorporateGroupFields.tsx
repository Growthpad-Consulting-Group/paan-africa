import type { TicketFormData } from "./types";
import { Icon } from "@iconify/react";

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<TicketFormData>>;
  formData: TicketFormData;
};

export default function CorporateGroupFields({ setFormData, formData }: Props) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Team Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Total Team Size (including yourself)
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                teamSize: Math.max(5, prev.teamSize - 1) 
              }))}
              className="w-10 h-10 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors flex items-center justify-center"
            >
              <Icon icon="mdi:minus" className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold text-paan-dark-blue min-w-[3rem] text-center">
              {formData.teamSize}
            </span>
            <button
              onClick={() => setFormData(prev => ({ 
                ...prev, 
                teamSize: prev.teamSize + 1 
              }))}
              className="w-10 h-10 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors flex items-center justify-center"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Minimum 5 team members. Each additional member costs $70 USD.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Team Members Names (Optional)
          </label>
          <textarea
            name="teamMembers"
            value={formData.teamMembers.join('\n')}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              teamMembers: e.target.value.split('\n').filter(name => name.trim()) 
            }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
            placeholder="Enter team member names (one per line)"
            rows={3}
          />
          <p className="text-sm text-gray-600 mt-1">
            You can add team member names now or provide them later via email.
          </p>
        </div>
      </div>
    </div>
  );
}
