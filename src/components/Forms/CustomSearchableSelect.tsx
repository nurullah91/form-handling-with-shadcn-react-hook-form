"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type TSelectOption = {
  label: string;
  value: string;
  keywords?: string; // optional: extra searchable text
};

type TCustomSearchableSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  required?: boolean;
  disabled?: boolean;
  options: TSelectOption[];
  className?: string;
  allowClear?: boolean;
};

const CustomSearchableSelect = ({
  name,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  required = false,
  disabled = false,
  options,
  className,
  allowClear = true,
}: TCustomSearchableSelectProps) => {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMsg = (errors?.[name]?.message as string) || "";

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? "This field is required" : false }}
        render={({ field }) => {
          const selected = options.find((o) => o.value === field.value);

          return (
            <div className={cn(className || "")}>
              {label && (
                <label htmlFor={name} className="text-lg font-semibold">
                  {label}
                </label>
              )}

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      disabled={disabled}
                      className={cn(
                        "w-full justify-between",
                        errorMsg
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      )}
                    >
                      <span className="truncate">
                        {selected?.label || placeholder}
                      </span>

                      <span className="flex items-center gap-1">
                        {allowClear && field.value && !disabled ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setValue(name, "");
                            }}
                            className="rounded p-1 text-muted-foreground hover:text-foreground"
                            aria-label="Clear selection"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        ) : null}

                        <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                      </span>
                    </Button>
                  </div>
                </PopoverTrigger>

                <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandList>
                      <CommandEmpty>{emptyText}</CommandEmpty>

                      <CommandGroup>
                        {options.map((opt) => (
                          <CommandItem
                            key={opt.value}
                            // Search matches this string; include keywords for better search
                            value={`${opt.label} ${opt.value} ${
                              opt.keywords ?? ""
                            }`}
                            onSelect={() => {
                              field.onChange(opt.value);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === opt.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {opt.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {errorMsg ? (
                <small style={{ color: "red" }}>{errorMsg}</small>
              ) : null}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomSearchableSelect;
