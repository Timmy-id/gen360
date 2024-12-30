export interface IBase {
  email: string;
  password: string;
  phone: string;
  refreshTokens?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
