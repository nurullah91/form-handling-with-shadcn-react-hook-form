import { Input } from "@/src/components/ui/input"; // Assuming you are using ShadCN's Input component
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

const CustomInput = ({
  type,
  name,
  label,
  disabled,
  required,
  placeholder,
  className,
}: TInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    if (type === "number") {
      const inputElement = document.getElementById(name);
      if (inputElement) {
        inputElement.addEventListener("wheel", (e) => e.preventDefault(), {
          passive: false,
        });
      }
    }
  }, [name, type]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        rules={{ required: required ? "This field is required" : false }}
        control={control}
        render={({ field }) => (
          <div className={`${className || ""}`}>
            {label && (
              <label htmlFor={name} className="text-lg font-semibold">
                {label}
              </label>
            )}

            {/* Use value from field */}
            <Input
              {...field}
              type={type}
              id={name}
              className="w-full" // Ensure w-full is applied here
              placeholder={placeholder}
              disabled={disabled}
              min={type === "number" ? 0 : undefined}
              step={type === "number" ? 0.01 : undefined} // Allow decimal points
            />

            {errors && (
              <small style={{ color: "red" }}>
                {errors?.[name]?.message as string}
              </small>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CustomInput;
