import { ComponentFixture, TestBed, tick, waitForAsync, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { LoginRegisterComponent } from './login-register.component';

describe('LoginRegisterComponent', () => {
  let component: LoginRegisterComponent;
  let fixture: ComponentFixture<LoginRegisterComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(
    waitForAsync(() => {
      mockAccountService = jasmine.createSpyObj('AccountService', ['postLoginAPI', 'postRegisterAPI']);
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);

      TestBed.configureTestingModule({
        declarations: [LoginRegisterComponent],
        providers: [
          { provide: AccountService, useValue: mockAccountService },
          { provide: Router, useValue: mockRouter }
        ],
        imports: [MatCardModule, MatTabsModule, MatFormFieldModule, MatIconModule,
          FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, BrowserAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('postLogin', () => {
    it('should navigate to "/shop" and set the account service properties on successful login', () => {

      const mockAccount: Account = { email: 'test@example.com', password: 'password123' };
      const mockResponse: any = {
        balance: 100,
        products: [],
        id: '123',
      };
      mockAccountService.postLoginAPI.and.returnValue(of(mockResponse));

      component.email = mockAccount.email;
      component.password = mockAccount.password;
      component.postLogin();

      expect(mockAccountService.postLoginAPI).toHaveBeenCalledWith(mockAccount);
      expect(mockAccountService.balance).toEqual(mockResponse.balance);
      expect(mockAccountService.accountProducts).toEqual(mockResponse.products)
      expect(mockAccountService.id).toEqual(mockResponse.id);
      expect(mockAccountService.isLoggedIn).toBeTrue();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/shop']);
      expect(component.message).toEqual('Succesful login.');
    });

    it('should display an error message on login failure', fakeAsync(() => {

      const mockAccount: Account = { email: 'test@example.com', password: 'password123' };
      const mockErrorResponse: any = { status: 500 };
      mockAccountService.postLoginAPI.and.returnValue(throwError(mockErrorResponse));

      component.email = mockAccount.email;
      component.password = mockAccount.password;
      component.postLogin();

      expect(mockAccountService.postLoginAPI).toHaveBeenCalledWith(mockAccount);
      expect(component.message).toEqual('Invalid email or password. Please try again.');

      tick(15000);

      expect(component.message).toBeNull();
    }));
  });
});
