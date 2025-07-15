import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

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

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) { }

  onLogin() {
    if (!this.username.trim() || !this.password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor ingresa tu usuario y contraseña',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }

    this.loginService.login(this.username, this.password).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: `Bienvenido ${this.username}`,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          this.nivelAcceso = this.authService.getNivelAcceso();

          switch (this.nivelAcceso) {
            case 1:
              this.router.navigate(['/productos']).then(() => window.location.reload());
              break;
            case 2:
              this.router.navigate(['/']).then(() => window.location.reload());
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: '¡Algo salió mal!',
          text: 'Credenciales incorrectas',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }

  registrarse() {
    this.router.navigate(['/registrarse']);
  }
}
