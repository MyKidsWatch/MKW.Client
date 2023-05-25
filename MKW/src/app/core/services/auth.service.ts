import { Injectable } from '@angular/core';
import { AccountClient } from '../proxies/mkw-api.proxy';
import { CreateUserDTO } from '../proxies/mkw-api.proxy';
import { Observable } from 'rxjs';
import { ReadUserDTOBaseResponseDTO } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private accountClient: AccountClient) { }

  public registerAccount(createUserDto: CreateUserDTO) : Observable<ReadUserDTOBaseResponseDTO>
  {
      let res = this.accountClient.register(createUserDto);
      return res;
  }


}
