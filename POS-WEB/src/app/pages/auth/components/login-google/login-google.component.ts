import { Component, NgZone, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CredentialResponse, PromptMomentNotification } from "google-one-tap";
import { environment } from "src/environments/environment";
import { BaseResponse } from "@shared/models/base-api-response.interface";

declare var window: any;
declare var google: any;
@Component({
  selector: "app-login-google",
  templateUrl: "./login-google.component.html",
  styleUrls: ["./login-google.component.scss"],
})
export class LoginGoogleComponent implements OnInit {
  //login Google 2 - llamar a los servicios para loguear
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private authService: AuthService
  ) {}

  private clientId = environment.clientId;

  ngOnInit(): void {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: this.clientId, //token de la api de google
        callback: this.handleCredentialResponse.bind(this), //metodo de credenciales
        auto_select: false, //selecionara su cuenta
        cancel_on_tap_outside: false, //autocancela si no seleciona
      });
      //diseño del button de google
      google.accounts.id.renderButton(document.getElementById("buttonGoogle"), {
        theme: "filled_blue",
        type: "standard",
        size: "large",
        text: "continue_with",
        shape: "square",
        with: 300,
      });
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.authService
      .loginWintGoogle(response.credential, "Externo")
      .subscribe(
        (resp: BaseResponse) => {
          if (resp.isSuccess) {
            this.ngZone.run(() => {
              this.router.navigate(["/"]);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
