import { ManagerGuard } from './guards/manager.guard';
import { DevGuard } from './guards/dev.guard';
import { CadastrarComponent } from './views/cadastrar/cadastrar.component';
import { AdminComponent } from './views/admin/admin.component';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dash',
    component: DashboardComponent,
    canActivate: [ DevGuard ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ ManagerGuard ]
  },
  {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: CadastrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
