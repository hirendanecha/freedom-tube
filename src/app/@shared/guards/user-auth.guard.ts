import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserAuthGuard implements CanActivate {
    environment = environment
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    canActivate() {
        const auth = this.authService.userData();
        const token = this.authService.getToken();
        const isLogin = (token && auth?.Id) || false;
        
        if (isLogin) {
            return true;
        } else {
            location.href = environment?.loginUrl || 'http://localhost:4200/login';
            return false;
        }
        // this.router.navigateByUrl('http://localhost:4200/login');
    }
}
