import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddFundDto, OperationClient } from 'src/app/core/proxies/mkw-api.proxy';
import { OperationService } from 'src/app/core/services/operation.service';
import { switchMap } from 'rxjs/operators';
import { RedirectToCheckoutClientOptions } from '@stripe/stripe-js';

import {
  StripeService,
  StripePaymentElementComponent,
  NgxStripeModule,
  NGX_STRIPE_VERSION
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentIntent
} from '@stripe/stripe-js';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
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
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [
    OperationClient,
    OperationService,
    FormsModule,
    ReactiveFormsModule,
    StripeService,


  ]
})
export class AddFundsModalComponent implements OnInit {

  private stripe: any;
  private internalCheckout: any;
  private operationId?: number;

  public isBuyingFunds: boolean = false;
  public amountUserIsBuying?: number = 0;
  public userBalance?: number = 0;


  public checkoutUrl?: SafeHtml | null;
  constructor(
    private modalController: ModalController,
    private operationService: OperationService,
    private userFacade: UserFacade) { }

  ngOnInit(): void {
    // Include the Stripe JavaScript library
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.type = 'text/javascript';
    script.onload = () => this.initializeStripe();
    document.head.appendChild(script);
  }

  observeCointCount() {
    this.userFacade.getUserCurrentCoinCount()
      .subscribe(res => this.userBalance = res);
  }

  initializeStripe(): void {
    this.stripe = Stripe('pk_test_51O8iiEFwBKVbGj8ejvWnWrTDxfN0qKsGSuUwSX4auhbFsu1HupWM1GQaYe2skgvG16ilcIn4PAtE5aZPdZDAZwrs00ix7leM59');
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel')
  }

  async initializeStripeCheckout() {

    if (!this.amountUserIsBuying)
      return;

    this.isBuyingFunds = false;
    this.operationService.addFunds(new AddFundDto({ coins: 1000 }))
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
      }))

  }


  completedStripe() {

    this.operationService.getOperationCurrentStatus(this.operationId!)
      .pipe(switchMap(() => {
        return this.userFacade.updateUserInformation()
      })).subscribe((res) => {
        this.stripe.unmount('#checkout');
        alert("Compra realizada com sucesso. Novo saldo: " + this.userBalance);
      })
  }


  selectAmountToBuy(coinAmount: number) {
    this.amountUserIsBuying = coinAmount;
  }

  getCoinCardClass(coinAmout: number) {
    console.log(coinAmout);
    console.log(this.amountUserIsBuying);
    return this.amountUserIsBuying == coinAmout ? 'selected' : '';
  }

}
declare var Stripe: any;
