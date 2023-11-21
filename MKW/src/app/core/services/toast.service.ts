import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  showMessage(message: string, type: string) {
    this.toastController.create({
      message: message,
      duration: 5000,
      buttons: [
        {
          icon: 'close',
        },
      ],
      color: type as 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'tertiary' | 'dark' | 'medium' | 'light',
      position: 'top',
    }).then(toast => toast.present());
  }

  showError(message: string) {
    this.showMessage(message, 'danger');
  }

  showSuccess(message: string) {
    this.showMessage(message, 'success');
  }

  showWarning(message: string) {
    this.showMessage(message, 'warning');
  }
}
