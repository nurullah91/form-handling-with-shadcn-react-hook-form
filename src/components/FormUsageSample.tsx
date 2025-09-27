"use client";

import CustomDatePicker from "./Forms/CustomDatePicker";
import CustomFileUploader from "./Forms/CustomFileUploader";
import CustomForm from "./Forms/CustomForm";
import CustomInput from "./Forms/CustomInput";
import CustomMultiSelect from "./Forms/CustomMultiSelect";
import CustomRichTextEditor from "./Forms/CustomRichTextEditor";
import CustomSelect from "./Forms/CustomSelect";
import CustomTextarea from "./Forms/CustomTextarea";
import { Button } from "./ui/button";

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
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
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
        <CustomRichTextEditor name="description" label="Description" required />

        {/* File uploader */}
        <CustomFileUploader name="files" label="Upload files" multiple />
        <Button type="submit">Submit</Button>
      </CustomForm>
    </div>
  );
}
