import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages/pages.routing';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';




const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'dashboard', component: PagesComponent},
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},

  {path: '**', component: NopagefoundComponent}
  // { path: 'path3', component: Name3Component },
  // { path: 'path4', component: Name4Component },
  // { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}),
            PagesRoutingModule,
            AuthRoutingModule],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
