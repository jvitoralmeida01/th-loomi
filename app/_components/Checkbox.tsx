import checkIcon from "@/assets/icons/check.svg";
import Image from "next/image";

interface InputProps {
  label: string;
  name: string;
}

export default function Checkbox(props: InputProps) {
  const { label, name } = props;
  return (
    <label className="flex items-center gap-2 relative cursor-pointer">
      <input type="checkbox" name={name} className="peer sr-only" />
      <span className="h-4 w-4 rounded border border-neutral-300 bg-transparent p-px transition peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/60 flex items-center justify-center" />
      <span className="absolute left-0 h-4 w-4 flex items-center justify-center p-px opacity-0 transition-opacity peer-checked:opacity-100 pointer-events-none">
        <Image src={checkIcon} alt="Check" className="w-full h-full" />
      </span>
      <span className="text-xs text-neutral-200">{label}</span>
    </label>
  );
}
