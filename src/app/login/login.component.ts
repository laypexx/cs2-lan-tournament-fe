import { FormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  login() {
    this.auth
      .login(this.username)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.auth.setUserName(this.username);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
