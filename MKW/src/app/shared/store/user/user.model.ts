export interface UserData {
    userId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    username?: string;
    isEmailVerified?: boolean;
    isAdmin?: boolean;
    coinCount?: number;
    childrenInformation: ChildInformation[];
}


export interface ChildInformation {
    childId: number;
    ageRangeId: number;
    genderId: number;
}

export interface TokenInfo {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
}