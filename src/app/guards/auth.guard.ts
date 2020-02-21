import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
    
  }

  async canActivate() {
    const isUserLoggedIn = await false;
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  
}
