export interface LoginResponse {
  access_token: string;
}

export interface GetUserByEmailResponse {
  id: string;
  name: string;
  email: string;
  state: string;
}
