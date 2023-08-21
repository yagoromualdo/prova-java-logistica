import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { ClientMapsComponent } from './components/client/client-maps/client-maps.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  },
  {
    path: 'client',
    component: ClientListComponent
  },
  {
    path: 'client/create',
    component: ClientFormComponent
  },
  {
    path: 'client/visualize/:idClient',
    component: ClientFormComponent
  },
  {
    path: 'client/update/:idClient',
    component: ClientFormComponent
  },
  {
    path: 'client/maps',
    component: ClientMapsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
