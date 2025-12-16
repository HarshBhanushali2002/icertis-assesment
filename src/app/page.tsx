"use client";
import Image from "next/image";
import styles from "./page.module.css";
import DynamicFormBuilder from "@/components/DynamicForm";
import { sampleSchema } from "@/components/data/sample-schema";
import { FormDataa } from "@/interface/form-schema.interface";

export default function Home() {
  const handleSubmit = async (data: FormDataa) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    // toast({
    //   title: 'Form Data Collected',
    //   description: 'Check the console to see the submitted data.',
    // });
  };

  return (
    <div>
      <div>
        <DynamicFormBuilder onSubmit={handleSubmit} schema={sampleSchema} />
      </div>
    </div>
  );
}
