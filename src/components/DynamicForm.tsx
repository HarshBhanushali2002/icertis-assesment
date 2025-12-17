"use client";
import {
  FormDataa,
  FormErrors,
  FormSchema,
} from "@/interface/form-schema.interface";
import { useCallback, useState } from "react";
import {
  checkConditionalVisibility,
  validateForm,
  validateField,
} from "@/lib/form-validations";
import { FormFieldsComponent } from "./FieldsComponent";

interface DynamicFormProps {
  schema: FormSchema;
  onSubmit: (data: FormDataa) => Promise<void> | void;
  //   className?: string;
}

export const DynamicFormBuilder = ({ schema, onSubmit }: DynamicFormProps) => {
  const [formData, setFormData] = useState<FormDataa>(() => {
    const initialData: FormDataa = {};
    schema.fields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialData[field.id] = field.defaultValue;
      }
    });
    return initialData;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange = useCallback(
    (fieldId: string, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [fieldId]: value }));

      const field = schema.fields.find((f) => f.id === fieldId);
      if (field) {
        const error = validateField(field, value);
        setErrors((prev) => {
          const newErrors = { ...prev };
          if (error) {
            newErrors[fieldId] = error;
          } else {
            delete newErrors[fieldId];
          }
          return newErrors;
        });
      }
    },
    [schema.fields]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const visibleFields = schema.fields.filter((field) =>
      checkConditionalVisibility(field, formData)
    );

    const validationErrors = validateForm(visibleFields, formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
    //   alert(JSON.stringify(formData, null, 2));
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData(() => {
      const initialData: FormDataa = {};
      schema.fields.forEach((field) => {
        if (field.defaultValue !== undefined) {
          initialData[field.id] = field.defaultValue;
        }
      });
      return initialData;
    });
    setErrors({});
  };
  const visibleFields = schema.fields.filter((field) =>
    checkConditionalVisibility(field, formData)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {schema.title}
            </h1>
            {schema.description && (
              <p className="text-gray-600">{schema.description}</p>
            )}
          </div>

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Form Submitted Successfully!
              </h2>
              <p className="text-green-700 mb-4">
                Your information has been received.
              </p>
              <div className="bg-white rounded-lg p-4 mt-4 text-left">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Submitted Data:
                </h3>
                <pre className="text-sm text-gray-600 overflow-auto">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  onClick={() => {
                    handleReset();
                    setIsSubmitting(false);
                    setIsSubmitted(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {"Submit Another Response"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {visibleFields.map((field) => (
                <FormFieldsComponent
                  key={field.id}
                  field={field}
                  value={formData[field.id]}
                  error={errors[field.id]}
                  onChange={handleFieldChange}
                />
              ))}

              <div className="mt-6 flex gap-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFormBuilder;
