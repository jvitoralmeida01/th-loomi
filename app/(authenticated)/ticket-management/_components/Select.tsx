import Image from "next/image";
import ArrowDownIcon from "@/assets/icons/arrow_down.svg";

interface SelectProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function Select({
  name,
  value,
  defaultValue,
  onChange,
  options,
  placeholder,
}: SelectProps) {
  const selectProps =
    value !== undefined ? { value } : { defaultValue: defaultValue ?? "" };

  return (
    <div className="relative">
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <Image src={ArrowDownIcon} alt="Select's trailing Arrow Down Icon" className="w-3 h-3" />
      </div>
      <select
        name={name}
        onChange={onChange}
        {...selectProps}
        className="appearance-none rounded-full bg-background px-4 py-2 pr-10 text-sm text-label placeholder:text-label focus:outline-none focus:border-primary cursor-pointer"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
