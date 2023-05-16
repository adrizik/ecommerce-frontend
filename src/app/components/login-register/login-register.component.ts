import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  constructor(private accountService: AccountService, private router: Router) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  reg_emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  email: string = ""
  password: string = ""
  reg_email: string = ""
  reg_password: string = ""

  message: string | null = null;
  reg_message: string | null = null;
  messageVisible: boolean = true;
  registerVisible: boolean = true;

  hide = true;

  postLogin(): void {
    let account: Account = { email: this.email, password: this.password }
    this.accountService.postLoginAPI(account).subscribe(
      (acc: any) => {
        console.log(acc);
        this.accountService.balance = acc.balance;
        this.accountService.accountProducts = acc.products;
        this.accountService.id = acc.id;
        this.accountService.isLoggedIn = true;
        this.router.navigate(['/shop']);
        this.message = "Succesful login."
      },
      error => {
        if (error.status === 500) {
          this.message = "Invalid email or password. Please try again."
          setTimeout(() => {
            this.message = null;
          }, 15000)
        }
      }
    )

  }

  postRegister(): void {
    let account: Account = { email: this.reg_email, password: this.reg_password }
    this.accountService.postRegisterAPI(account).subscribe(
      (acc: any) => {
        console.log(acc);
        this.accountService.balance = acc.balance;
        this.accountService.id = acc.id;
        this.reg_message = "Registration was successful! Please login."
        setTimeout(() => {
          this.reg_message = null;
        }, 15000)

      },
      error => {
        if (error.status === 500) {
          this.reg_message = "User associated with email already exists. Please Login or select Forgot Password."
          setTimeout(() => {
            this.reg_message = null;
          }, 15000)
        }
      });
  }

}
