import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AccountUtils } from 'src/app/core/Util/AccountUtil';
import { ChildDtoBaseResponseDTO } from 'src/app/core/proxies/mkw-api.proxy';
import { AgeRangeService } from 'src/app/core/services/age-range.service';
import { ChildService } from 'src/app/core/services/child.service';
import { LoadingBarService } from 'src/app/core/services/loading-bar.service';
import { ChildrenCard } from 'src/app/shared/models/children-card.model';

@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.scss'],
})
export class ViewChildrenComponent implements OnInit {

  public childrenCards: ChildrenCard[] = [];
  public isLoadingContent: boolean = false;

  constructor(
    private childService: ChildService,
    private loadingBarService: LoadingBarService,
    private ageRangeService: AgeRangeService
  ) { }

  ngOnInit() {
    this.setLoadingBar();

  }

  setLoadingBar() {
    this.loadingBarService.getLoadingBar().subscribe((response) => {
      this.isLoadingContent = response as boolean;
    })
  }

  ionViewDidEnter() {
    this.childrenCards = [];
    this.childService.getChildren().pipe(take(1)).subscribe({
      next: (response) => {
        this.buildChildrenCards(response)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  buildChildrenCards(childrenResponse: ChildDtoBaseResponseDTO) {
    childrenResponse.content?.forEach(children => {
      let gender = AccountUtils.getGenderString(children.genderId);

      // this.childrenCards.push(
      //   {
      //     ageRange: AccountUtils.getAgeRangeString(children.ageRangeId),
      //     id: children.id!,
      //     style: gender ? gender : 'unassigned',
      //     gender
      //   })
    });
  }

}


