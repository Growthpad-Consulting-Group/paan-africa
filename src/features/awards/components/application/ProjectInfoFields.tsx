import type { AwardFormData } from "@/features/awards/components/application/types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: AwardFormData;
  handleInputChange: (e: FieldChange) => void;
  errors: Record<string, string>;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
};

export default function ProjectInfoFields({ formData, handleInputChange, errors, handleFileUpload, removeImage }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project/Work Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Title *
          </label>
          <input
            type="text"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
              errors.projectTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your project title"
          />
          {errors.projectTitle && <p className="text-red-500 text-xs mt-1">{errors.projectTitle}</p>}
        </div>
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Description *
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
              errors.projectDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your project, its impact, and why it deserves recognition"
          />
          {errors.projectDescription && <p className="text-red-500 text-xs mt-1">{errors.projectDescription}</p>}
        </div>
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project URL (Optional)
          </label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
            placeholder="https://your-project.com"
          />
        </div>
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Images (Optional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
          />
          {formData.projectImages.length > 0 && (
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
              {formData.projectImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Project ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
