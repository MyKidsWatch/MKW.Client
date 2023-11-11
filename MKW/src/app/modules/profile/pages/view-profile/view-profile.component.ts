import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { UserData } from 'src/app/shared/store/user/user.model';
import {take } from 'rxjs'

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent  implements OnInit {

  public userData?: UserData;
  public coinCount?: number;
  constructor(private userFacade: UserFacade, private router: Router) { }

  ngOnInit() {
    this.userData = this.userFacade.getUserState();

    this.userFacade.getUserCurrentCoinCount()
    .subscribe(res => {
      console.log(res);
      this.coinCount = res
    });
  }

  logOffUser()
  {
    this.userFacade.logOffUser().pipe(take(1)).subscribe(res =>{
      this.router.navigateByUrl('auth', {replaceUrl: true})
    })
  }
}
