import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopComponent } from '../components/shop/shop.component';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private HttpClient: HttpClient) { }

  products: Products[] = [];
  itemToSearch = "";
  ev = "http://localhost:9000";

  getAllProducts() {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.HttpClient.get(`${this.ev}/products`, { headers: header });
  }

  getSearch() {
    let header: HttpHeaders = new HttpHeaders();
    header.append("accept", "text/json");
    header.append("Access-Control-Allow-Origin", "*");
    return this.HttpClient.get(`${this.ev}/products/name/${this.itemToSearch}`, { headers: header });
  }

}
