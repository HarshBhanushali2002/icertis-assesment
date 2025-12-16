import { FormField } from "@/interface/form-schema.interface";

export const FormFieldsComponent: React.FC<{
  field: FormField;
  value: any;
  error?: string;
  onChange: (id: string, value: any) => void;
}> = ({ field, value, error, onChange }) => {
  const inputClasses = `w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    error ? 'border-red-500' : 'border-gray-300'
  }`;

  const renderInput = () => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            id={field.id}
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={inputClasses}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={inputClasses}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={inputClasses}
          />
        );

      case 'select':
        return (
          <select
            id={field.id}
            value={value || ''}
            onChange={(e) => onChange(field.id, e.target.value)}
            className={inputClasses}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={(e) => onChange(field.id, e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
              {field.label}
            </label>
          </div>
        );

      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value || ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(field.id, e.target.value)}
            rows={4}
            className={inputClasses}
          />
        );

      default:
        return null;
    }
  };

  if (field.type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label htmlFor={field.id} className="block mb-2 text-sm font-medium text-gray-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};