export interface ProfileModel {
  userId?: number;
  imageURL?: string | null;
  name?: string | null;
  username?: string | null;
  children?: ProfileChildModel[] | null;
  hasAnyAward?: boolean;
  goldenAwards: number;
  silverAwards: number;
  bronzeAwards: number;
}

export interface ProfileChildModel {
  id?: number;
  ageRangeId?: number;
  ageRange: string;
  genderId?: number;
  gender: string;
}