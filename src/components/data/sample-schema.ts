import { FormSchema } from "@/interface/form-schema.interface";

export const sampleSchema: FormSchema = {
  id: "sample-form",
  title: "User Registration Form",
  description: "Please fill out the form below to register for our service.",
  fields: [
    {
      id: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      required: true,
      validation: [
        {
          type: "required",
          message: "First name is required",
        },
        {
          type: "minLength",
          value: 2,
          message: "First name must be at least 2 characters",
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
        {
          type: "required",
          message: "Last name is required",
        },
      ],
    },
    {
      id: "email",
      type: "text",
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
      validation: [
        {
          type: "required",
          message: "Email is required",
        },
        {
          type: "pattern",
          value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
          message: "Please enter a valid email address",
        },
      ],
    },
    {
      id: "age",
      type: "number",
      label: "Age",
      placeholder: "Enter your age",
      validation: [
        {
          type: "min",
          value: 18,
          message: "You must be at least 18 years old",
        },
        {
          type: "max",
          value: 120,
          message: "Please enter a valid age",
        },
      ],
    },
    {
      id: "userType",
      type: "select",
      label: "User Type",
      required: true,
      options: [
        {
          value: "",
          label: "Select an Option",
        },
        {
          value: "individual",
          label: "Individual",
        },
        {
          value: "business",
          label: "Business",
        },
        {
          value: "student",
          label: "Student",
        },
      ],
      validation: [
        {
          type: "required",
          message: "Please select a user type",
        },
      ],
    },
    {
      id: "companyName",
      type: "text",
      label: "Company Name",
      placeholder: "Enter your company name",
      conditional: {
        fieldId: "userType",
        operator: "equals",
        value: "business",
      },
      validation: [
        {
          type: "required",
          message: "Company name is required for business users",
        },
      ],
    },
    {
      id: "newsletter",
      type: "checkbox",
      label: "Subscribe to newsletter",
      defaultValue: false,
    },
    {
      id: "birthDate",
      type: "date",
      label: "Birth Date",
      conditional: {
        fieldId: "userType",
        operator: "equals",
        value: "individual",
      },
    },
    {
      id: "terms",
      type: "checkbox",
      label: "I agree to the terms and conditions",
      required: true,
      validation: [
        {
          type: "required",
          message: "You must agree to the terms and conditions",
        },
      ],
    },
  ],
};
