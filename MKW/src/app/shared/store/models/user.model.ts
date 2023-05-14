export interface UserData{
    username: string;
    token: TokenInfo;
    isEmailVerified: boolean;
    isPremium: boolean;
}

export interface TokenInfo{
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
}