export class UserData{
    userId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    username?: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
    coinCount?: number;
}

export class TokenInfo{
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}