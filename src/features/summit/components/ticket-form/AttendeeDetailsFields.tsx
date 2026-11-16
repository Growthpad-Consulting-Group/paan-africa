import type { TicketFormData } from "./types";
import type { FieldChange } from "@/types/forms";
import { countries } from "@/data/countries";

type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
  errors: Record<string, string>;
  roles: string[];
};

export default function AttendeeDetailsFields({ formData, handleInputChange, errors, roles }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Full Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
    
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Email Address *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
    
      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
    
      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Country *
        </label>
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.country ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
      </div>
    
      {/* Role */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Role/Position *
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
      </div>
    
      {/* Company */}
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          Company/Organization *
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all ${
            errors.company ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your company name"
        />
        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
      </div>
    </div>
  );
}
