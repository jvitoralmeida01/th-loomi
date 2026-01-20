import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  accessToken: string;
}

@injectable()
export class LoginUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const response = await this.nortusRepository.login({
      email: input.email,
      password: input.password,
    });

    return {
      accessToken: response.access_token,
    };
  }
}
