import { AgeRangeService } from "../services/age-range.service";

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

    static getAgeRangeString(ageRangeId?: number)
    {
        let ageRangeString = '';
        switch(ageRangeId)
        {
            case 1:
                ageRangeString = '0 a 2 anos'
                break;
            case 2:
                ageRangeString = '3 a 5 anos'
                break;
            case 3:
                ageRangeString = '6 a 8 anos'
                break;
            case 4:
                ageRangeString = '9 a 11 anos'
                break;
            case 5:
                ageRangeString = '12 a 14 anos'
                break;
            case 6:
                ageRangeString = '15 a 17 anos'
                break;
        }

        return ageRangeString;

    }


}