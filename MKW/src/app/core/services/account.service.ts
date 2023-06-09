import { Injectable } from '@angular/core';
import { AccountClient, CheckEmailDTOBaseResponseDTO, CheckUserNameDTOBaseResponseDTO, RequestCheckEmailDTO, RequestCheckUserNameDTO } from '../proxies/mkw-api.proxy';
import { CreateUserDTO } from '../proxies/mkw-api.proxy';
import { Observable } from 'rxjs';
import { ReadUserDTOBaseResponseDTO } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private accountClient: AccountClient) { }

  public registerAccount(createUserDto: CreateUserDTO) : Observable<any>
  {
      let res = this.accountClient.register(createUserDto);
      return res;
  }

  public checkEmail(email: string) : Observable<CheckEmailDTOBaseResponseDTO>
  {
    let res = this.accountClient.checkEmail({email} as RequestCheckEmailDTO);
    return res;
  }

  public checkUsername(userName: string) : Observable<CheckUserNameDTOBaseResponseDTO>
  {
    let res = this.accountClient.checkUsername({userName} as RequestCheckUserNameDTO);
    return res;
  }
  public getUserInfo()
  {
    let res = this.accountClient.token();
    return res;
  }

}
