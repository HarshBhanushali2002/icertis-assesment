import { FormSchema } from "@/interface/form-schema.interface";

export const sampleSchema: FormSchema = {
  title: "User Registration Form",
  description: "Please fill out all required fields",
  fields: [
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: [
        { type: "required", message: "First name is required" },
        {
          type: "minLength",
          value: 2,
          message: "Must be at least 2 characters",
        },
        {
          type: "maxLength",
          value: 50,
          message: "Must be less than 50 characters",
        },
      ],
    },
    {
      id: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      validation: [
        { type: "required", message: "Last name is required" },
        {
          type: "minLength",
          value: 2,
          message: "Must be at least 2 characters",
        },
        {
          type: "maxLength",
          value: 50,
          message: "Must be less than 50 characters",
        },
      ],
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      placeholder: "your.email@example.com",
      required: true,
      validation: [
        { type: "required", message: "Email is required" },
        { type: "email", message: "Please enter a valid email address" },
      ],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      required: true,
      validation: [
        { type: "required", message: "Age is required" },
        { type: "min", value: 18, message: "Must be at least 18 years old" },
        { type: "max", value: 120, message: "Please enter a valid age" },
      ],
    },
    {
      id: "country",
      type: "select",
      label: "Country",
      required: true,
      options: [
        { value: "", label: "Select a country" },
        { value: "us", label: "United States" },
        { value: "uk", label: "United Kingdom" },
        { value: "ca", label: "Canada" },
        { value: "au", label: "Australia" },
        { value: "in", label: "India" },
      ],
      validation: [{ type: "required", message: "Please select a country" }],
    },
    {
      id: "state",
      type: "text",
      label: "State/Province",
      placeholder: "Enter your state",
      conditional: {
        dependsOn: "country",
        condition: "equals",
        value: "us",
      },
       validation: [
        { type: "required", message: "This Field is required" },
        {
          type: "minLength",
          value: 2,
          message: "Must be at least 2 characters",
        },
        {
          type: "maxLength",
          value: 50,
          message: "Must be less than 50 characters",
        },
      ],
    },
    {
      id: "subscribe",
      type: "checkbox",
      label: "Subscribe to newsletter",
      defaultValue: false,
    },
    {
      id: "interests",
      type: "select",
      label: "Primary Interest",
      conditional: {
        dependsOn: "subscribe",
        condition: "equals",
        value: true,
      },
      options: [
        { value: "", label: "Select an interest" },
        { value: "tech", label: "Technology" },
        { value: "business", label: "Business" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
      ],
    },
    {
      id: "birthdate",
      type: "date",
      label: "Date of Birth",
      required: true,
      validation: [{ type: "required", message: "Birth date is required" }],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      placeholder: "Any additional information...",
       validation: [
        // { type: "required", message: "Last name is required" },
        {
          type: "minLength",
          value: 1,
          message: "Must be at least 1 characters",
        },
        {
          type: "maxLength",
          value: 150,
          message: "Must be less than 150 characters",
        },
      ],
    },
  ],
};
