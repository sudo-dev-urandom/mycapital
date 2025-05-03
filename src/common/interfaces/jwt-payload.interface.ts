export interface JwtPayload {
  username: string;
  userId: number;
  iat?: number;
  exp?: number;
}
