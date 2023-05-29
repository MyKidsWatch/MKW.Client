export class UserData{

    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    username?: string;
    isEmailVerified?: boolean;
    isPremium?: boolean;
}

export class TokenInfo{
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}