export interface LoginBody {
  userName: string;
  password: string;
}

export interface RefreshBody {
  currentJWT?: string;
}

export interface AuthResp {
  token: string;
  userId: string;
  expiresAt?: string;
}
