import { Injectable } from '@angular/core';
import { AccountClient, AuthenticationClient, LoginRequestByEmailDTO, LoginRequestByUserNameDTO } from '../proxies/mkw-api.proxy';
import { CreateUserDTO } from '../proxies/mkw-api.proxy';
import { Observable } from 'rxjs';
import { ReadUserDTOBaseResponseDTO } from '../proxies/mkw-api.proxy';
import { ILoginRequestDTO } from 'src/app/modules/auth/models/login-request';
import { EmailUtils } from '../Util/EmailUtils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authClient: AuthenticationClient) { }

  public authenticate(request: ILoginRequestDTO) : Observable<any>
  {
      return EmailUtils.isEmail(request.credential) ? 
      this.authClient.email(new LoginRequestByEmailDTO({email: request.credential, password: request.password})) : 
      this.authClient.username(new LoginRequestByUserNameDTO({userName: request.credential, password: request.password})); 
  }


}
