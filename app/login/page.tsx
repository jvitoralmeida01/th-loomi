import Image from "next/image";

import loginHero from "@/assets/login_hero.png";
import logo from "@/assets/text_logo.svg";
import arrowDownIcon from "@/assets/icons/arrow_down.svg";
import brFlag from "@/assets/flags/br.png";
import helpIcon from "@/assets/icons/customer_support.svg";
import Checkbox from "../_components/Checkbox";
import Button, { ButtonVariant } from "../_components/Button";
import TextField from "../_components/TextField";
import ReverseBorderRadius from "../_components/ReverseBorderRadius";

async function loginAction(formData: FormData) {
  "use server";
  const username = formData.get("username");
  const password = formData.get("password");

  // Mocked login response for now.
  console.info("Mock login", { username, hasPassword: Boolean(password) });
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-label">
      <main className="mx-auto flex w-full flex-col gap-10 py-16 px-16 lg:flex-row lg:items-stretch">
        <section className="flex flex-17 flex-col items-start justify-between">
          <Image src={logo} alt="Nortus" className="h-8 w-auto" priority />

          <div className="flex flex-col gap-14 w-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-space-grotesk text-neutral-200">Login</h1>
              <p className="text-md text-neutral-200 tracking-wide">
                Entre com suas credenciais para acessar a sua conta.
              </p>
            </div>

            <form action={loginAction} className="space-y-5 w-full">
              <div className="space-y-6">
                <TextField
                  name="username"
                  type="email"
                  required
                  placeholder="Usuário"
                  supportText="Insira o seu e-mail, CPF ou passaporte."
                />
                <TextField
                  name="password"
                  type="password"
                  required
                  placeholder="Senha"
                />
              </div>

              <div className="flex items-center justify-between text-md text-label-disabled pr-4">
                <Checkbox label="Lembrar meu usuário" name="remember" />
                <a href="#" className="text-sm text-primary">
                  Esqueci minha senha
                </a>
              </div>

              <Button type="submit" className="w-full mt-12" variant={ButtonVariant.PRIMARY}>
                Entrar
              </Button>
            </form>
          </div>

          <div />
        </section>

        <section className="h-full relative flex flex-20 items-center justify-center">
          <div className="absolute right-0 top-0 z-10 flex flex-col items-end">
            <div className="flex flex-row items-start">
              <ReverseBorderRadius />
              <div className="bg-background pl-4 pb-4 rounded-bl-4xl flex items-start gap-3 text-xs text-label">
                <Button
                  type="button"
                  className="flex items-center gap-2 py-6"
                  variant={ButtonVariant.NAV}
                >
                  <Image src={helpIcon} alt="Customer Support Icon" className="h-5 w-5" />
                  Ajuda
                </Button>
                <Button
                  type="button"
                  className="flex items-center gap-2"
                  variant={ButtonVariant.NAV}
                >
                  <Image src={arrowDownIcon} alt="Arrow Down Icon" className="h-4 w-4" />
                  <Image src={brFlag} alt="Flag Icon" className="h-4 w-4" />
                  PT-br
                </Button>
                <div />
              </div>
            </div>
            <ReverseBorderRadius />
          </div>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={loginHero}
              alt="Nortus Hero"
              className="h-full w-full object-contain pointer-events-none"
              priority
            />
          </div>
        </section>
      </main>
    </div>
  );
}
