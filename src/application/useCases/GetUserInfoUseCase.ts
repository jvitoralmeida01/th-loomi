import { injectable, inject } from "tsyringe";
import { INortusRepository } from "@/src/application/repositories.interface/INortusRepository";
import { User } from "@/src/domain/entities/auth";

export interface GetUserInfoInput {
  email: string;
}

export type GetUserInfoOutput = User;

@injectable()
export class GetUserInfoUseCase {
  constructor(
    @inject(INortusRepository)
    private readonly nortusRepository: INortusRepository
  ) {}

  async execute(input: GetUserInfoInput): Promise<GetUserInfoOutput> {
    const response = await this.nortusRepository.getUserByEmail(input.email);

    return {
      id: response.id,
      name: response.name,
      email: response.email,
      state: response.state,
    };
  }
}
