import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {path: '', loadChildren: './componentes/main/main.module#MainModule' , canActivate: [AuthGuard]},
  {path: 'login', loadChildren: './componentes/login/login.module#LoginModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
