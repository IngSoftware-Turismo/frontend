import { Component, OnInit } from '@angular/core';
import { Turista } from '../shared/models/turista';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Categoria } from '../shared/models/categoria';
import { Paquete } from '../shared/models/paquete';
import { CategoriaService } from '../services/categoria.service';
import { TuristaService } from '../services/turista.service';
import { Observer } from 'rxjs';
import { Reserva } from '../shared/models/reserva';
import { PaqueteService } from '../services/paquete.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { ReservaService } from '../services/reserva.service';
@Component({
  selector: 'app-realizar-reservas',
  templateUrl: './realizar-reservas.component.html',
  styleUrls: ['./realizar-reservas.component.css']
})
export class RealizarReservasComponent implements OnInit {
  turista: Turista = new Turista() ;
  paquete: Paquete = new Paquete();
  metodoPago: string;
  reservaForm: FormGroup;
  subido = false;
  turista2: Turista ;
  reserva: Reserva = new Reserva();
  paquetes: Paquete [];


  constructor(private fb: FormBuilder, private categoriaServicio: CategoriaService,
              private turistaServicio: TuristaService, private paqueteServicio: PaqueteService,
              private reservaServicio: ReservaService) { }

  ngOnInit() {
    this.getPaquetes();
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
    this.getTurista(this.turista.ci);
  }
  getTurista(ci: number): void {
    let tempo = new Turista();
    const observador: Observer<Turista> = {
      next: (data) => {
        tempo = data;
        if (tempo === null) {
          this.postTurista(this.turista);
          console.log('postear');
          this.reserva.turista = this.turista;
        } else {
          this.reserva.turista = tempo;

        }

        this.paquete = this.paquetes.filter(paquete => paquete.nombre.trim() === this.paquete.nombre.trim())[0];
        console.log('imprimiendo paquete');
        console.log(this.paquetes);
        console.log(this.paquete);
        const paqueteFix = new Paquete();
        paqueteFix.id = this.paquete.id;
        paqueteFix.categoria = this.paquete.categoria;
        paqueteFix.nombre = this.paquete.nombre;
        paqueteFix.cupoMinimo = this.paquete.cupoMinimo;
        const utc = new Date().toJSON().slice(0, 10);
        this.reserva.fecha = utc;
        this.reserva.paquete = paqueteFix;
        this.reserva.estadoPago = 'No pagado';
        this.reserva.eliminado = false;
        this.reserva.metodoPago = this.metodoPago;
        this.reservaServicio.reservar(this.reserva);
        alert('Reserva realizada exitosamente');
        this.reset();
      },
         error: (error) => {
        console.log(error);
        console.log('se produjo el siguiente error al recuperar un paquete');
      },
      complete: () => {
        console.log('proceso finalizado');
      }
    };

    this.turistaServicio.getTurista(ci).subscribe(observador);
    }
  postTurista(turista: Turista): void {
    console.log(turista);
    this.turistaServicio.postTurista(turista);
  }
  getPaquetes(): void {
    this.paqueteServicio.getPaquetes().subscribe(paquetes => this.paquetes = paquetes);
  }
  reset(): void {
    this.reservaForm.reset();
    this.validateAllFields(this.reservaForm);
  }
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
