export type FieldType =
  | "text"
  | "number"
  | "select"
  | "checkbox"
  | "date"
  | "email"
  | "textarea";

export interface ValidationRule {
  type:
    | "required"
    | "min"
    | "max"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "email";

  value?: string | number;
  message: string;
}

export interface FieldOption {
  label: string;
  value: string;
}

export interface ConditionalRule {
  fieldId: string;
  operator: "equals" | "notEquals" | "contains" | "greaterThan" | "lessThan";
  value: string | number | boolean;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  options?: FieldOption[];
  validation?: ValidationRule[];
  conditional?: ConditionalRule;
  description?: string;
  required?: boolean;
}

export interface FormSchema {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

export interface FormDataa {
  [key: string]: any;
}

export interface FormErrors {
  [fieldId: string]: string;
}
