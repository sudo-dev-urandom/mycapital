export interface JwtPayload {
  username: string;
  userId: number;
  iat?: number; // issued at (optional)
  exp?: number; // expiration time (optional)
}
