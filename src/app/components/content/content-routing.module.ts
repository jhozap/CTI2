import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvestigacionInstitucionalComponent } from './GRIFT/investigacion-institucional/investigacion-institucional.component';
import { InvestigacionImplementadaComponent } from './GRIFT/investigacion-implementada/investigacion-implementada.component';
import { CasoEmblematicoComponent } from './GRIFT/caso-emblematico/caso-emblematico.component';
import { SemillerosComponent } from './GRIFT/semilleros/semilleros.component';
import { RedesComponent } from './GRIFT/redes/redes.component';
import { GraficaProductoComponent } from './GRIFT/grafica-producto/grafica-producto.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { NewInvestigadoresComponent } from './administracion/new-investigadores/new-investigadores.component';
import { UnidadesComponent } from './administracion/unidades/unidades.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'investigacion-institucional', component: InvestigacionInstitucionalComponent },
  { path: 'investigacion-implementada', component: InvestigacionImplementadaComponent },
  { path: 'caso-emblematico', component: CasoEmblematicoComponent },
  { path: 'semilleros-investigacion', component: SemillerosComponent },
  { path: 'redes-investigacion', component: RedesComponent },
  { path: 'grafica-productos', component: GraficaProductoComponent },
  { path: 'grafica-investigaciones', component: GraficaProductoComponent },
  { path: 'administracion', component: AdministracionComponent },
  { path: 'administracion/usuarios', component: UsuariosComponent },
  { path: 'administracion/newinvestigadores', component: NewInvestigadoresComponent },
  { path: 'administracion/unidades', component: UnidadesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
