"use client";

import z from "zod";
import CustomDatePicker from "./Forms/CustomDatePicker";
import CustomFileUploader from "./Forms/CustomFileUploader";
import CustomForm from "./Forms/CustomForm";
import CustomInput from "./Forms/CustomInput";
import CustomMultiSelect from "./Forms/CustomMultiSelect";
import CustomRichTextEditor from "./Forms/CustomRichTextEditor";
import CustomSelect from "./Forms/CustomSelect";
import CustomTextarea from "./Forms/CustomTextarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

// 🧩 Define the Zod schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9+\-()\s]*$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  Details: z.string().optional(),
  dateOfBirth: z
    .date("Date of birth is required")
    .or(z.string().pipe(z.coerce.date())),
  country: z.string().nonempty("Please select a country"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  files: z
    .array(
      z
        .any()
        .refine(
          (file) => file instanceof File,
          "Each uploaded item must be a valid file"
        )
    )
    .optional(),
});

export default function FormUsageSample() {
  const onSubmit = (data: object) => {
    console.log(data);
  };

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    Details: "",
    dateOfBirth: "",
    country: "",
    skills: [],
    description: "",
    files: [],
  };

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
  ];
  const skillsOptions = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "node" },
  ];
  return (
    <div className="w-full p-4 md:w-2/3 lg:w-1/2">
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        Form Usage Sample
      </h1>
      <CustomForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resolver={zodResolver(formSchema)}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Input */}
          <CustomInput name="firstName" type="text" label="First name" />
          <CustomInput name="lastName" type="text" label="Last name" />
          <CustomInput name="email" type="email" label="Email" />
          <CustomInput name="phone" type="text" label="Phone" />

          {/* Textarea */}
          <CustomTextarea name="Details" label="Details" />

          {/* Date */}
          <CustomDatePicker name="dateOfBirth" label="Date of Birth" />

          {/* Select and multi select */}
          <CustomSelect
            name="country"
            label="Select Country"
            placeholder="Choose a country"
            required
            options={countryOptions}
          />
          <CustomMultiSelect
            name="skills"
            label="Select Your Skills"
            required
            options={skillsOptions}
          />

          {/* Text editor */}
          <CustomRichTextEditor
            name="description"
            label="Description"
            required
          />

          {/* File uploader */}
          <CustomFileUploader name="files" label="Upload files" multiple />
          <Button type="submit">Submit</Button>
        </div>
      </CustomForm>
    </div>
  );
}
