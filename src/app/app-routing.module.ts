import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/assets/guards/authguard.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  { path: 'navbar', component: NavbarComponent },
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginRegisterComponent },
  { path: 'shop', component: ShopComponent, canActivate: [AuthguardGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthguardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
