import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewAddOrEditModalComponent } from './review-add-or-edit-modal.component';

describe('ReviewAddOrEditModalComponent', () => {
  let component: ReviewAddOrEditModalComponent;
  let fixture: ComponentFixture<ReviewAddOrEditModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewAddOrEditModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewAddOrEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
