import { Component, OnInit } from '@angular/core';
import { Turista } from '../shared/models/turista';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../shared/models/categoria';
import { Paquete } from '../shared/models/paquete';
import { CategoriaService } from '../services/categoria.service';
import { TuristaService } from '../services/turista.service';
import { Observer } from 'rxjs';
@Component({
  selector: 'app-realizar-reservas',
  templateUrl: './realizar-reservas.component.html',
  styleUrls: ['./realizar-reservas.component.css']
})
export class RealizarReservasComponent implements OnInit {
  turista: Turista ;
  paquete: Paquete ;
  metodoPago: String;
  reservaForm: FormGroup;
  categorias: Categoria [];
  subido = false;
  turista2: Turista ;


  constructor(private fb: FormBuilder, private categoriaServicio: CategoriaService, private turistaServicio: TuristaService) { }

  ngOnInit() {
    this.getCategorias();
    this.reservaForm = this.fb.group({
      nombre: ['', Validators.required],
      ci: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      apellidos: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6)]],
      paquete: ['' ],
      metodoPago: ['' ]
    });
  }
  get f() { return this.reservaForm.controls; }

  onSubmit(): void {
    this.turista.nombre = this.reservaForm.get('nombre').value;
    // alert(this.turista.nombre);
    // console.log(this.turista.nombre);
  }
  guardar(): void {
    this.subido = true;
    if (this.reservaForm.invalid) {
      return;
    }
    console.log('rekt');
    this.turista.nombre = this.reservaForm.get('nombre').value;
    this.turista.ci = this.reservaForm.get('ci').value;
    this.turista.correo = this.reservaForm.get('correo').value;
    this.turista.apellidos = this.reservaForm.get('apellidos').value;
    this.turista.telefono = this.reservaForm.get('telefono').value;
    this.paquete.nombre = this.reservaForm.get('paquete').value;
    this.metodoPago = this.reservaForm.get('metodoPago').value;

    this.getTurista(this.turista.ci);
  }
  getTurista(ci: number): void {
    let tempo = new Turista();
    let categoria = new Categoria();
    const observador: Observer<Turista> = {
      next: (data) => {
        console.log(data);
        tempo = data;
        if (tempo.nombre == null) {
          this.postTurista(this.turista);
          console.log('postear');
        }
        const obs2: Observer<Categoria> = {
          next: (data) => {
            console.log(data);
            categoria = data;


        }
      };
      }
    };

    this.turistaServicio.getTurista(ci).subscribe(observador);
    this.categoriaServicio.get

  }
  postTurista(turista: Turista): void {
    this.turistaServicio.postTurista(turista);
  }
  getCategorias(): void {
    this.categoriaServicio.getCategorias().subscribe(categorias => this.categorias = categorias);
  }
}
