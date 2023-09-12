import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerifyComponent } from './verify/verify.component';
import { VotingComponent } from './voting/voting.component';
import { VotedComponent } from './voted/voted.component';
import { DeniedComponent } from './denied/denied.component';
import { ContactComponent } from './contact/contact.component';
import { FlowComponent } from './flow/flow.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'stepverifyc',
    component: VerifyComponent,
  },
  {
    path: 'stepvote',
    component: VotingComponent,
  },
  {
    path: 'votingaccepted',
    component: VotedComponent,
  },
  {
    path: 'votingdenied',
    component: DeniedComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'flow',
    component: FlowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
