"use client";

import CustomForm from "./Forms/CustomForm";
import CustomInput from "./Forms/CustomInput";
import { Button } from "./ui/button";

export default function SignupForm() {
  const onSubmit = (data: object) => {
    console.log(data);
  };

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        This is SignupForm component
      </h1>
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput name="firstName" type="text" label="First name" />
        <CustomInput name="lastName" type="text" label="Last name" />
        <CustomInput name="email" type="email" label="Email" />
        <CustomInput name="phone" type="text" label="Phone" />
        <Button type="submit">Submit</Button>
      </CustomForm>
    </div>
  );
}
