import Button, { ButtonVariant } from "./Button";
import Image from "next/image";
import addIcon from "@/assets/icons/add.svg";
import TopbarTitle from "@/app/_components/TopbarTitle";

export default function Topbar() {
  return (
    <nav className="fixed w-full top-0 z-40 bg-surface px-8 py-4 shadow-lg">
      <div className="flex flex-row justify-between items-center pl-24">
        <TopbarTitle />
        <Button
          variant={ButtonVariant.ACTION}
          type="button"
          className="flex flex-row items-center gap-2 font-montserrat font-semibold glow-primary hover:shadow-none transition-all duration-300"
        >
          <Image src={addIcon} alt="Add Ticket Icon" className="h-3 w-3" />
          Novo Ticket
        </Button>
      </div>
    </nav>
  );
}
