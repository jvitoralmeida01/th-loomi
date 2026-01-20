"use server";

import { redirect } from "next/navigation";
import { container } from "@/di/container";
import { AuthService } from "@/src/application/services/AuthService";

export async function login(formData: FormData) {
  const email = formData.get("username") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("remember") === "on";

  const authService = container.resolve(AuthService);
  const result = await authService.login({ email, password, rememberMe });

  if (result.success) {
    redirect("/dashboard");
  }

  const errorMessage = encodeURIComponent(
    result.error || "Falha ao fazer login. Tente novamente."
  );
  redirect(`/login?error=${errorMessage}`);
}
