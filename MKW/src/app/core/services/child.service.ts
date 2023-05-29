import { Injectable } from '@angular/core';
import { ChildClient, ChildDto, CreateChildDto } from '../proxies/mkw-api.proxy';

@Injectable({
  providedIn: 'root'
})
export class ChildService {
  constructor(private childClient: ChildClient) { }

  getChildren() {
    return this.childClient.childGet();
  }

  createChild(request: CreateChildDto) {
    return this.childClient.childPost(request);
  }

  updateChild(request: ChildDto) {
    return this.childClient.childPut(request);
  }

  deleteChild(id: number) {
    return this.childClient.childDelete(id, `${id}`);
  }
}
