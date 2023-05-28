import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { RemoveUser } from 'src/app/shared/store/actions/user.action';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent  implements OnInit {

  constructor(private store: Store, private router: Router) { }

  ngOnInit() {}


  logOffUser()
  {
      this.store.dispatch(new RemoveUser()).subscribe({
        next: () =>{
            this.router.navigateByUrl('auth');
        }
      });
  }
}
