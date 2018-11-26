import { Component, OnInit } from '@angular/core';
import { Turista } from '../shared/models/turista';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Categoria} from '../shared/models/categoria';
import { Paquete } from '../shared/models/paquete';
import {CategoriaService} from '../services/categoria.service';
import { TuristaService } from '../services/turista.service';

@Component({
  selector: 'app-realizar-reservas',
  templateUrl: './realizar-reservas.component.html',
  styleUrls: ['./realizar-reservas.component.css']
})
export class RealizarReservasComponent implements OnInit {
  turista: Turista = new Turista ();
  paquete: Paquete = new Paquete();
  metodoPago: String;
  reservaForm: FormGroup;
  categorias: Categoria [];
  subido = false;


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
    this.turista.nombre = this.reservaForm.get('nombre').value;
    this.turista.ci = this.reservaForm.get('ci').value;
    this.turista.correo = this.reservaForm.get('correo').value;
    this.turista.apellidos = this.reservaForm.get('apellidos').value;
    this.turista.telefono = this.reservaForm.get('telefono').value;
    this.paquete.nombre = this.reservaForm.get('paquete').value;
    this.metodoPago = this.reservaForm.get('metodoPago').value;
    // alert(this.metodoPago);
    // console.log(this.paquete.nombre);
  }
  getTurista(ci:number): void
  {
    let tempo;
    this.turistaServicio.getTurista(ci).subscribe(turista => tempo = turista);
    if( tempo === null){
      this.postTurista(this.turista)
    }
  }
  postTurista(turista: Turista): void{
    
  }
  getCategorias(): void {
    this.categoriaServicio.getCategorias().subscribe(categorias => this.categorias = categorias);
  }
}
