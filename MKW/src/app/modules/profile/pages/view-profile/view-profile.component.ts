import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RemoveUser } from 'src/app/shared/store/user/user.action';
import { UserData } from 'src/app/shared/store/user/user.model';
import { UserSelectors } from 'src/app/shared/store/user/user.selectors';
import { UserState } from 'src/app/shared/store/user/user.state';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent  implements OnInit {

  public userData?: UserData;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
    this.store.select(UserSelectors.getUser).subscribe({
      next: (user) =>{
        this.userData = user;
      }
    });
  }


  logOffUser()
  {
      this.store.dispatch(new RemoveUser()).subscribe({
        next: () =>{
            this.router.navigateByUrl('auth', { replaceUrl: true });
        }
      });
  }
}
