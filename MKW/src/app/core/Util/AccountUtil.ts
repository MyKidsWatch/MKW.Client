import { AgeRangeService } from "../services/age-range.service";
import { TranslateService } from "@ngx-translate/core";

export class AccountUtils {
    static getGenderString(genderNumber?: number) : string | undefined
    {
        let gender;

        switch(genderNumber)
        {
            case 1:
                gender = 'boy'
                break;  
            case 2:
                gender = 'girl'
                break;
        }

        return gender;
    }

    static getAgeRangeString(ageRangeId?: number, translateService?: TranslateService)
    {
        let ageRangeString = '';
        switch(ageRangeId)
        {
            case 1:
                ageRangeString = '0 ' + translateService?.instant('to') + ' 2 ' + translateService?.instant('profile.yearsOld')
                break;
            case 2:
                ageRangeString = '3 ' + translateService?.instant('to') + ' 5 ' + translateService?.instant('profile.yearsOld')
                break;
            case 3:
                ageRangeString = '6 ' + translateService?.instant('to') + ' 8 ' + translateService?.instant('profile.yearsOld')
                break;
            case 4:
                ageRangeString = '9 ' + translateService?.instant('to') + ' 11 ' + translateService?.instant('profile.yearsOld')
                break;
            case 5:
                ageRangeString = '12 ' + translateService?.instant('to') + ' 14 ' + translateService?.instant('profile.yearsOld')
                break;
            case 6:
                ageRangeString = '15 ' + translateService?.instant('to') + ' 17 ' + translateService?.instant('profile.yearsOld')
                break;
        }

        return ageRangeString;

    }

    static getAgeRangeStringSimplified(ageRangeId?: number, translateService?: TranslateService)
    {
        let ageRangeString = '';
        switch(ageRangeId)
        {
            case 1:
                ageRangeString = '0 - 2 '
                break;
            case 2:
                ageRangeString = '3 - 5 '
                break;
            case 3:
                ageRangeString = '6 - 8 '
                break;
            case 4:
                ageRangeString = '9 - 11 '
                break;
            case 5:
                ageRangeString = '12 - 14 '
                break;
            case 6:
                ageRangeString = '15 - 17 '
                break;
        }

        return ageRangeString;

    }
}