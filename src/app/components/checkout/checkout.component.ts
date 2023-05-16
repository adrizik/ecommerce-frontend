import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  constructor(private accountService: AccountService) { }

  products = this.accountService.accountProducts;

  balance = this.accountService.balance;

  checkout() {
    this.accountService.postCheckout().subscribe(
      (response: any) => {
        console.log(response);
        this.alertWithSuccess();
        this.accountService.balance = response.balance;
        this.accountService.accountProducts = [];
        this.balance = response.balance;
        this.products = [];
      }
    );
  }

  alertWithSuccess() {
    console.log("alert is playing...")
    Swal.fire('Thank you for your purchase!', 'Your products will be delivered shortly.', 'success')
  }

}
