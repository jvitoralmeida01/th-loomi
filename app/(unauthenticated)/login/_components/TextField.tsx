"use client";

import { useState } from "react";
import Image from "next/image";
import eyeOnIcon from "@/assets/icons/eye_on.svg";
import eyeOffIcon from "@/assets/icons/eye_off.svg";

interface TextFieldProps {
  name: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  supportText?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({
  name,
  type = "text",
  placeholder,
  supportText,
  required = false,
  className = "",
  value,
  onChange,
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const resolvedValue = value ?? internalValue;
  const hasValue = resolvedValue !== "";
  const showPlaceholder = placeholder && !hasValue;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(event.target.value);
    }
    onChange?.(event);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="relative flex items-center rounded-xl border border-neutral-400 bg-transparent px-4 py-4 focus-within:border-primary">
        {showPlaceholder && (
          <label
            htmlFor={name}
            className="pointer-events-none absolute left-4 flex items-center text-md text-neutral-300"
          >
            {placeholder}
            {required && <span className="text-required">*</span>}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={inputType}
          required={required}
          value={resolvedValue}
          onChange={handleChange}
          className="relative w-full bg-transparent text-sm text-label focus:outline-none"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Image
              src={showPassword ? eyeOffIcon : eyeOnIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              className="h-6 w-6 cursor-pointer"
            />
          </button>
          )}
      </div>
      {supportText && (
        <p className="text-xs text-neutral-300 pl-4">{supportText}</p>
      )}
    </div>
  );
}

