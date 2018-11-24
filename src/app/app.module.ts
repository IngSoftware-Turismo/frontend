import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { appRoutes } from './routes/rutas.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';

import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RealizarReservasComponent } from './realizar-reservas/realizar-reservas.component';
@NgModule({
   declarations: [
      AppComponent,
      ListarReservasComponent,
      NavBarComponent,
      RealizarReservasComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      RouterModule.forRoot(appRoutes),
      HttpClientModule,
      ReactiveFormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {

 }
