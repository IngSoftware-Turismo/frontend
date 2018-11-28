import { Component, OnInit } from '@angular/core';
import { Categoria } from '../shared/models/categoria';
import { CategoriaService } from '../services/categoria.service';
import { Paquete } from '../shared/models/paquete';
import { PaqueteService } from '../services/paquete.service';
import { Observer } from 'rxjs';
import { Reserva } from '../shared/models/reserva';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit {
  categorias: Categoria[];
  categoria: Categoria;
  paquetes: Paquete[];
  paquete: Paquete = new Paquete();
  cantidadReservas: number;
  reservas: Reserva[];
  constructor(private categoriaServicio: CategoriaService, private paqueteServicio: PaqueteService,
              private reservaServicio: ReservaService) { }

  ngOnInit() {
    this.getCategorias();
    this.paquete.cupoMinimo = 0;
  }
  getCategorias(): void {
    this.categoriaServicio.getCategorias().subscribe(categorias => this.categorias = categorias);
  }
  onChange(nombreCategoria) {
    this.categoria = this.categorias.filter(categoria => categoria.nombre === nombreCategoria)[0];

    this.getPaquetes(this.categoria.id);

  }
  getPaquetes(id: number): void {
    const observador: Observer<Paquete[]> = {
      next: (data) => {
        this.paquetes = data;
        this.paquete = this.paquetes.filter(paquete => paquete.nombre === this.paquetes[0].nombre)[0];
        this.mostrarDatos();
        this.obtenerReservas(this.paquete.id);
      },
      error: (error) => {
          },
      complete: () => {
        }
    };
    this.paqueteServicio.getPaquetesTodos(id).subscribe(observador);
 //   this.paqueteServicio.getPaquetesTodos(id).subscribe(paquetes => this.paquetes = paquetes);
  }

  mostrarDatos(): void {

  }
  obtenerReservas(idPaquete: number): void {
    const observador: Observer<Reserva[]> = {
      next: (data) => {
        this.reservas = data;
        console.log(this.reservas.length + ' reservassssssssssssssssssssssssss');
        this.cantidadReservas = this.reservas.length;

      },
      error: (error) => {
      },
      complete: () => {
      }
    };
    this.reservaServicio.getReservas(idPaquete).subscribe(observador);
  }

}
