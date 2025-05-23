import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { VexModule } from "../@vex/vex.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { CustomLayoutAuthComponent } from "./custom-layout-auth/custom-layout-auth.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { AuthInterceptor } from "@shared/interceptors/auth.interceptor";
import { MAT_DATE_LOCALE } from "@angular/material/core";

@NgModule({
  declarations: [AppComponent, NotFoundComponent, CustomLayoutAuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    VexModule,
    CustomLayoutModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "es-ES" },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
