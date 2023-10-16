import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFacade } from 'src/app/shared/facades/user.facade';
import { UserData } from 'src/app/shared/store/user/user.model';


@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent  implements OnInit {

  public userData?: UserData;
  constructor(private userFacade: UserFacade, private router: Router) { }

  ngOnInit() {
    this.userData = this.userFacade.getUserState();
  }

  logOffUser()
  {
    this.userFacade.logOffUser().subscribe(res =>{
      this.router.navigateByUrl('auth', {replaceUrl: true})
    })
  }
}
