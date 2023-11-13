import { Injectable } from '@angular/core';
import { AddFundDto, OperationClient } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private operationClient: OperationClient) { }

  public addFunds(addFundsRequest: AddFundDto) {
    let res = this.operationClient.funds(addFundsRequest);
    return res;
  }
}
