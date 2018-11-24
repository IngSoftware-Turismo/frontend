import { ListarReservasComponent } from '../listar-reservas/listar-reservas.component';
import { RealizarReservasComponent } from '../realizar-reservas/realizar-reservas.component';


import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'listar-reservas',
    component: ListarReservasComponent
  },
  {
    path: 'realizar-reservas',
    component: RealizarReservasComponent
  }
];