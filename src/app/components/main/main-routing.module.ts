import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  { path: '', component: MainComponent, children: [ 
    { path: '', loadChildren: () => import('../content/content.module').then(m => m.ContentModule) }        
  ]},  
  // {path: 'logout', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
