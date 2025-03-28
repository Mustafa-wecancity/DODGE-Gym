import { Inject, Injectable, PLATFORM_ID, } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private store: Store,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    

    // Redirect to the login page
    if ( isPlatformBrowser(this.platformId)&&typeof localStorage !== 'undefined' &&!localStorage.getItem('customerAuthorization')) {
      return this.router.createUrlTree(['/auth/login']);
    }
 
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      if ( isPlatformBrowser(this.platformId)&&typeof localStorage !== 'undefined' &&!!localStorage.getItem('customerAuthorization')) {
      if(this.router.url.startsWith('/account') || this.router.url == '/checkout' || this.router.url == '/compare')
        this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}