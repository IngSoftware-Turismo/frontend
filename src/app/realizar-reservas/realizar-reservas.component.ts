import { Component, OnInit } from '@angular/core';
import { Turista } from '../shared/models/turista';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-realizar-reservas',
  templateUrl: './realizar-reservas.component.html',
  styleUrls: ['./realizar-reservas.component.css']
})
export class RealizarReservasComponent implements OnInit {
  turista: Turista;
  reservaForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
   this.reservaForm = this.fb.group({
      nombre: [''],
      ci: [''],
      correo: [''],
     apellidos: [''],
     telefono: ['']
    });
  }
  onSubmit(): void {
    this.turista.nombre = this.reservaForm.get('nombre').value;
    alert(this.turista.nombre);
    console.log(this.turista.nombre);
  }
  guardar(): void{
    this.turista.nombre = this.reservaForm.get('nombre').value;
    alert(this.turista.nombre);
    console.log(this.turista.nombre);
  }

}
