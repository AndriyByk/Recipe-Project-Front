import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {ContentPageModule} from "./pages/content-page/content-page.module";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MainInterceptor} from "./main.interceptor";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        ContentPageModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MainInterceptor
    }
  ],
    exports: [

    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
