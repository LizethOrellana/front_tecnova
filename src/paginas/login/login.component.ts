import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  nivelAcceso: number = 3;

  constructor(private authService: AuthService, private loginService: LoginService, private router: Router) { }

  onLogin() {
    this.loginService.login(this.username, this.password).subscribe({
      next: () => {
        this.nivelAcceso = this.authService.getNivelAcceso();
        if (this.nivelAcceso === 1) {
          this.router.navigate(['/productos']).then(() => {
            window.location.reload();
          });
        } else if (this.nivelAcceso === 2) {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      },
      error: () => alert('Credenciales incorrectas')
    });
  }
  registrarse() {
    this.router.navigate(['/registrarse']);
  }
}
