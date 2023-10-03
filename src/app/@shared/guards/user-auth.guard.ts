import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
    environment = environment;
    tokenData: any;
    constructor(
        private authService: AuthService,
        private commonService: CommonService,
        private router: Router
    ) {
        const url = environment.apiUrl + 'login/me';
        this.commonService
            .get(url, {
                withCredentials: true,
            })
            .subscribe({
                next: (res) => {
                    console.log('token ==>', res);
                    this.tokenData = res;
                },
                error: (err) => {
                    console.log(err);
                },
            });
    }

    canActivate() {
        if (this.tokenData) {
            const auth = this.tokenData?.user;
            const token = this.tokenData?.accessToken;
            const isLogin = (token && auth?.Id) || false;
            if (isLogin) {
                return true;
            } else {
                location.href = environment?.loginUrl;
                return false;
            }
        } else {
            return false;
        }
    }
}
