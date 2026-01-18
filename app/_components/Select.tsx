interface SelectProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export default function Select({
  name,
  value,
  defaultValue,
  onChange,
  options,
  placeholder,
  className = "",
}: SelectProps) {
  const selectProps =
    value !== undefined ? { value } : { defaultValue: defaultValue ?? "" };

  return (
    <select
      name={name}
      onChange={onChange}
      {...selectProps}
      className={`rounded-xl border border-neutral-400 bg-background px-4 py-4 text-sm text-label focus:outline-none focus:border-primary cursor-pointer ${className}`}
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
  );
}

