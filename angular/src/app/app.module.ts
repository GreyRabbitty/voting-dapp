import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './verify/verify.component';
import { VotingComponent } from './voting/voting.component';
import { VotedComponent } from './voted/voted.component';
import { DeniedComponent } from './denied/denied.component';
import { ContactComponent } from './contact/contact.component';
import { FlowComponent } from './flow/flow.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavComponent, FooterComponent, VerifyComponent, VotingComponent, VotedComponent, DeniedComponent, ContactComponent, FlowComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
