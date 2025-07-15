import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log('authGuard ejecutado', route.routeConfig?.path);

    if (!authService.isAuthenticated()) {
        console.log('No autenticado - redirigiendo a login');
        router.navigate(['/login']);
        return false;
    }

    const nivelUsuario = authService.getNivelAcceso();
    const nivelesPermitidos: number[] = route.data['niveles'];

    console.log('Nivel usuario:', nivelUsuario);
    console.log('Niveles permitidos:', nivelesPermitidos);

    if (nivelesPermitidos && nivelesPermitidos.includes(nivelUsuario)) {
        return true;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Acceso denegado',
            text: 'No tienes permiso para acceder a esta ruta',
            confirmButtonText: 'OK'
        });
        router.navigate(['/']);
        return false;
    }
};
