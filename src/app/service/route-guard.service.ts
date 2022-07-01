import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  valid_path=["/grupos","/empleados","/dashboard","/agregar-empleado"]

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      console.log(state.url)
      if(this.valid_path.includes(state.url))return true;
      else{
        this.router.navigate(['/dashboard']);
        return false;
      }
      
  }

}
