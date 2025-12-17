import { FormDataa, FormField } from "@/interface/form-schema.interface";

export function validateField(
  field: FormField,
  value: string | number | boolean | undefined
): string | null {
  if (field.id === "birthDate" && value && value !== "") {
    const today = new Date();
    const birthDate = new Date(value as string);
    if (birthDate > today) {
      return "Birth date cannot be in the future";
    }

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const d = today.getDate() - birthDate.getDate();
    let realAge = age;
    if (m < 0 || (m === 0 && d < 0)) {
      realAge--;
    }
    if (realAge < 18) {
      return "You must be at least 18 years old";
    }
  }

  if (!field.validation) return null;

  for (const rule of field.validation) {
    const stringValue = String(value ?? "");
    const numValue = Number(value);

    switch (rule.type) {
      case "required":
        if (field.type === "checkbox") {
          if (!value) {
            return rule.message;
          }
        } else {
          if (value === undefined || value === "" || value === null) {
            return rule.message;
          }
        }
        break;

      case "minLength":
        if (stringValue.length < (rule.value as number)) {
          return rule.message;
        }
        break;

      case "maxLength":
        if (stringValue.length > (rule.value as number)) {
          return rule.message;
        }
        break;

      case "min":
        if (!isNaN(numValue) && numValue < (rule.value as number)) {
          return rule.message;
        }
        break;

      case "max":
        if (!isNaN(numValue) && numValue > (rule.value as number)) {
          return rule.message;
        }
        break;

      case "pattern":
        const regex = new RegExp(rule.value as string);
        if (stringValue && !regex.test(stringValue)) {
          return rule.message;
        }
        break;
    }
  }

  return null;
}

export function validateForm(
  fields: FormField[],
  formData: FormDataa
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const error = validateField(field, formData[field.id]);
    if (error) {
      errors[field.id] = error;
    }
  }

  return errors;
}

export function checkConditionalVisibility(
  field: FormField,
  formData: FormDataa
): boolean {
  if (!field.conditional) return true;

  const { fieldId, operator, value } = field.conditional;
  const dependentValue = formData[fieldId];

  switch (operator) {
    case "equals":
      return dependentValue === value;
    case "notEquals":
      return dependentValue !== value;
    case "contains":
      return String(dependentValue).includes(String(value));
    case "greaterThan":
      return Number(dependentValue) > Number(value);
    case "lessThan":
      return Number(dependentValue) < Number(value);
    default:
      return true;
  }
}
