import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {ContentPageModule} from "./pages/content-page/content-page.module";
import {AppRoutingModule} from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ContentPageModule,
    AppRoutingModule
  ],
  providers: [],
    exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
