import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/pages/auth/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authServices: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      //consulta si creo el token
      const user = this.authServices.userToken

      //Inicia sesion si es verdadero
      if (user) {
        return true;
      }
    //Login Paso 1 - Redirecciona al login, si no tiene autorizacion
    this.router.navigate(["/login"]);
    return false;
  }
}
