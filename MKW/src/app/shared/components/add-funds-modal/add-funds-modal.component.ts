import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AddFundDto, OperationClient } from 'src/app/core/proxies/mkw-api.proxy';
import { OperationService } from 'src/app/core/services/operation.service';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';
import { UserFacade } from '../../facades/user.facade';


@Component({
  selector: 'app-add-funds-modal',
  templateUrl: './add-funds-modal.component.html',
  styleUrls: ['./add-funds-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule,
  ],

  providers: [
    OperationClient,
    OperationService,
    StripeService
  ]
})
export class AddFundsModalComponent implements OnInit, OnDestroy {
  private stripe: any;
  private internalCheckout: any;
  private operationId?: number;
  private language: string;

  public isBuyingFunds: boolean = false;
  public fundsBoughtSuccessfully: boolean = false;
  public amountUserIsBuying?: number = 0;
  public userBalance?: number = 0;


  private isCheckoutMounted: boolean = false;

  constructor(
    private modalController: ModalController,
    private operationService: OperationService,
    private userFacade: UserFacade,
    private translateService: TranslateService) {
    this.language = this.translateService.currentLang == 'pt-BR' ? 'pt-BR' : 'en-US';
    console.log(this.language)
  }

  ngOnInit(): void {


    console.log()
    this.observeCointCount();
    // Include the Stripe JavaScript library
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.type = 'text/javascript';
    script.onload = () => this.initializeStripe();
    document.head.appendChild(script);
  }

  ngOnDestroy(): void {
    if (this.internalCheckout) {
      this.internalCheckout.destroy('#checkout');
      this.internalCheckout = undefined;
    }
  }



  getPrices(price: number) {
    if (price == 100)
      return this.language == 'pt-BR' ? 'R$ 34,99' : '$ 6,99';
    else if (price == 50)
      return this.language == 'pt-BR' ? 'R$ 19,99' : '$ 3,99';
    else
      return this.language == 'pt-BR' ? 'R$ 9,99' : '$ 1,99';
  }

  observeCointCount() {
    this.userFacade.getUserCurrentCoinCount()
      .subscribe(res => this.userBalance = res);
  }

  initializeStripe(): void {
    this.stripe = Stripe('pk_test_51O8iiEFwBKVbGj8ejvWnWrTDxfN0qKsGSuUwSX4auhbFsu1HupWM1GQaYe2skgvG16ilcIn4PAtE5aZPdZDAZwrs00ix7leM59');
  }

  cancel() {
    this.unmountCheckout();
    this.modalController.dismiss(null, 'cancel')
  }

  async initializeStripeCheckout() {
    if (!this.amountUserIsBuying)
      return;

    this.isBuyingFunds = true;
    this.operationService.addFunds(new AddFundDto({ coins: this.amountUserIsBuying!, language: this.language }))
      .subscribe((async (res) => {

        let checkoutUrl = res.content![0].checkoutUrl;
        this.operationId = res.content![0].id!;

        const checkout = await this.stripe.initEmbeddedCheckout({
          clientSecret: checkoutUrl,
          onComplete: () => {
            this.completedStripe()
          }
        });
        this.internalCheckout = checkout;
        this.internalCheckout.mount('#checkout');
        this.isCheckoutMounted = true;

        document.querySelectorAll('iframe').forEach(element => {
          new ResizeObserver(() => {
            if (element.style.height != '100%')
              element.style.position = 'absolute';
            element.style.bottom = '0';
            element.style.left = '0';
            element.style.width = '100%';
            element.style.height = '95%';
            element.style.zIndex = '999';
            element.style.margin = 'auto';
          }).observe(element)
        })
      }));
  }


  unmountCheckout() {
    if (this.internalCheckout && this.isCheckoutMounted) {
      this.internalCheckout.unmount('#checkout');
      this.isCheckoutMounted = false;
    }
  }

  completedStripe() {
    this.operationService.getOperationCurrentStatus(this.operationId!)
      .pipe(switchMap(() => {
        return this.userFacade.updateUserInformation()
      })).subscribe((res) => {
        this.unmountCheckout();
        this.isBuyingFunds = false;
        this.fundsBoughtSuccessfully = true;
      })
  }

  selectAmountToBuy(coinAmount: number) {
    this.amountUserIsBuying = coinAmount;
  }

}
declare var Stripe: any;
