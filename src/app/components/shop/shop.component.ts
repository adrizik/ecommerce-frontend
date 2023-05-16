import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account.service';
import { ShopService } from 'src/app/services/shop.service';
import Swal from 'sweetalert2';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public shopService: ShopService, private accountService: AccountService, private _snackBar: MatSnackBar) { }

  products: any[] = [];

  productKeyword: string = "";

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.shopService.getAllProducts().subscribe(json => {
      this.products = json as any[];
      console.log(this.products);
    });
  }

  addToAccount(id: number) {
    this.accountService.postProductToAccount(id).subscribe(
      (response: any) => {
        console.log(response);
        this.openSnackBar();
        this.accountService.balance = response.balance;
        this.accountService.accountProducts = response.products;
        console.log(response.products);
      },
      (error) => {
        this.alertWithError();
        console.log("product already exists in the cart");
      }
    );
  }

  search(): void {
    this.shopService.itemToSearch = this.productKeyword;
    this.shopService.getSearch().subscribe(json => {
      this.products = json as any[];
      console.log(this.products);
    });
    console.log(this.productKeyword);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 5 * 1000,
    });
  }

  alertWithError() {
    Swal.fire(
      'Product is already in cart',
      'Visit your cart and checkout!',
      'error'
    )
  }

}
