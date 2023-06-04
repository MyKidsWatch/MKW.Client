import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, pipe, map } from 'rxjs';
import { AccountService } from '../services/account.service';

export function matchFieldsValidator(field1: string, field2: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const control1 = formGroup.get(field1);
        const control2 = formGroup.get(field2);

        if (control1!.value !== control2!.value) {
        control2!.setErrors({ matchFields: true });
        return { matchFields: true };
        }

        control2!.setErrors(null);
        return null;
      };
}


export function unusedEmail(accountService: AccountService): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {

        return accountService.checkEmail(control.value).pipe(
            map(response =>{
                if(!response.isSuccess)
                {
                    return { emailTaken: true}
                }
                return null;
            })
        )        
    }
}

export function unusedUserName(accountService: AccountService): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {

        return accountService.checkUsername(control.value).pipe(
            map(response =>{
                if(!response.isSuccess)
                {
                    return { userNameTaken: true}
                }
                return null;
            })
        )        
    }
}


