import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.isAuthenticated()) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};
