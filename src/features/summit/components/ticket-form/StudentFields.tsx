import type { TicketFormData } from "./types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function StudentFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Student Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Student ID / Registration Number
          </label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
            placeholder="Enter your student ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Institution/University
          </label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
            placeholder="Enter your institution name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Expected Graduation Year
          </label>
          <select
            name="graduationYear"
            value={formData.graduationYear}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select graduation year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="graduated">Already Graduated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
