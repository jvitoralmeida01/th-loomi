import { injectable, inject } from "tsyringe";
import { cookies } from "next/headers";
import { LoginUseCase, LoginInput } from "../useCases/LoginUseCase";
import {
  GetUserInfoUseCase,
  GetUserInfoOutput,
} from "../useCases/GetUserInfoUseCase";

export const AUTH_TOKEN_COOKIE = "auth_token";
export const USER_INFO_COOKIE = "user_info";

export interface AuthLoginInput {
  email: string;
  password: string;
}

export interface AuthLoginOutput {
  success: boolean;
  userInfo?: GetUserInfoOutput;
  error?: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(LoginUseCase)
    private readonly loginUseCase: LoginUseCase,
    @inject(GetUserInfoUseCase)
    private readonly getUserInfoUseCase: GetUserInfoUseCase
  ) {}

  async login(input: AuthLoginInput): Promise<AuthLoginOutput> {
    try {
      const loginResult = await this.loginUseCase.execute({
        email: input.email,
        password: input.password,
      } as LoginInput);

      const cookieStore = await cookies();
      cookieStore.set(AUTH_TOKEN_COOKIE, loginResult.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      const userInfo = await this.getUserInfoUseCase.execute({
        email: input.email,
      });

      cookieStore.set(USER_INFO_COOKIE, JSON.stringify(userInfo), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return {
        success: true,
        userInfo,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}
