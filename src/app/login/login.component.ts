import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HomePageService } from '../services/home-page.service';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });



  service = inject(HomePageService);
  router = inject(Router);
  toaster = inject(ToastrService);

  constructor() {
  }

  login() {
    this.service
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((value) => {
        if (value) {

          this.router.navigate(['/home']);
        } else {
          this.toaster.error('Credenciales incorrectas', 'Intento fallido');
        }
      });
    console.log(this.loginForm.value);
  }
}
