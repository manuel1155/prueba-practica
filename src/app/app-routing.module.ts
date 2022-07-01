import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { EmpleadosComponent } from './views/empleados/empleados.component';
import { AddEmpleadoComponent } from './views/empleados/add-empleado/add-empleado.component';
import { GruposComponent } from './views/grupos/grupos.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ RouteGuardService ],
    children: [
      {
        path: 'dashboard',
        canActivate: [ RouteGuardService ],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        data: {
          title: 'Empleados'
        },
        canActivate: [ RouteGuardService ]
      },
      {
        path: 'agregar-empleado',
        component: AddEmpleadoComponent,
        data: {
          title: 'Agregar Empleado'
        },
        canActivate: [ RouteGuardService ]
      },
      {
        path: 'grupos',
        component: GruposComponent,
        data: {
          title: 'Empleados'
        },
        canActivate: [ RouteGuardService ]
      },
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
