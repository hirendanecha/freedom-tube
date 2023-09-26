import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
    
    constructor(
        private authService: AuthService
    ) {}

    canActivate() {
        const auth = this.authService.userData();        
        const isLogin = (auth?.token && auth?._id) || false;        
        
        if (isLogin) {
            return true;
        }

        window.location.href = '/?action=login';  
        return false;
    }
}
