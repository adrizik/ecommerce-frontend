import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account: Account = { email: "", password: "" }

  balance: any;
  id: any;
  accountProducts: any[] = [];

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  ev = "http://localhost:9000"

  postLoginAPI(account: Account) {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.http.post<Account>(`${this.ev}/login`, account, { headers: header });
  }

  postRegisterAPI(account: Account) {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.http.post<Account>(`${this.ev}/register`, account, { headers: header });
  }

  postProductToAccount(id: number) {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.http.post(`${this.ev}/${this.id}/add/` + id, { headers: header });
  }

  postCheckout() {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.http.post(`${this.ev}/checkout/${this.id}`, { headers: header });
  }

}
