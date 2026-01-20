"use client";

import { useState } from "react";
import Image from "next/image";
import { z } from "zod";
import eyeOnIcon from "@/assets/icons/eye_on.svg";
import eyeOffIcon from "@/assets/icons/eye_off.svg";

const emailSchema = z.string().email("Por favor, insira um e-mail válido.");

interface TextFieldProps {
  name: string;
  type?: "text" | "password" | "email";
  placeholder?: string;
  supportText?: string;
  errorText?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export default function TextField({
  name,
  type = "text",
  placeholder,
  supportText,
  errorText,
  required = false,
  className = "",
  value,
  onChange,
  onValidationChange,
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const isPassword = type === "password";
  const isEmail = type === "email";
  const inputType = isPassword && showPassword ? "text" : type;
  const resolvedValue = value ?? internalValue;
  const hasValue = resolvedValue !== "";
  const showPlaceholder = placeholder && !hasValue;

  const validateEmail = (emailValue: string) => {
    if (!isEmail) return;

    if (!emailValue) {
      setValidationError(null);
      onValidationChange?.(false);
      return;
    }

    const result = emailSchema.safeParse(emailValue);
    if (result.success) {
      setValidationError(null);
      onValidationChange?.(true);
    } else {
      const issue = result.error.issues?.[0];
      setValidationError(
        issue?.message || "Por favor, insira um e-mail válido."
      );
      onValidationChange?.(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(event);

    if (touched) {
      validateEmail(newValue);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    validateEmail(resolvedValue);
  };

  const displayError = errorText || (touched && validationError);
  const hasError = Boolean(displayError);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        className={`relative flex items-center rounded-xl border bg-transparent px-4 py-4 focus-within:border-primary ${
          hasError ? "border-red-500" : "border-neutral-400"
        }`}
      >
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
          onBlur={handleBlur}
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
      {displayError && (
        <p className="text-xs text-red-500 pl-4">{displayError}</p>
      )}
      {supportText && !displayError && (
        <p className="text-xs text-neutral-300 pl-4">{supportText}</p>
      )}
    </div>
  );
}
