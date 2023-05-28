export class UserData{

    username?: string;
    isEmailVerified?: boolean;
    isPremium?: boolean;
}

export class TokenInfo{
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}